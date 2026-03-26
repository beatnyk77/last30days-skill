import os
import sys
import json
import asyncio
from datetime import datetime
from pydantic import BaseModel
from typing import List, Optional
from fastapi import FastAPI, BackgroundTasks, HTTPException
from supabase import create_client, Client
from dotenv import load_dotenv

# Load env variables
load_dotenv()

app = FastAPI()

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Warning: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.", file=sys.stderr)

class RunRequest(BaseModel):
    run_id: str
    keyword: str
    platforms: List[str]
    daysBack: int = 30

async def append_log(supabase: Client, run_id: str, log_type: str, message: str):
    timestamp = datetime.now().strftime("%I:%M:%S %p")
    log_entry = {
        "type": log_type,
        "message": message,
        "timestamp": timestamp
    }
    
    try:
        # Fetch current logs
        response = supabase.table("pipeline_runs").select("logs").eq("id", run_id).execute()
        if not response.data:
            return
            
        current_logs = response.data[0].get("logs") or []
        current_logs.append(log_entry)
        
        # Update logs
        supabase.table("pipeline_runs").update({"logs": current_logs}).eq("id", run_id).execute()
    except Exception as e:
        print(f"Error appending log to Supabase: {e}", file=sys.stderr)

async def execute_task(run_id: str, keyword: str, platforms: List[str], days_back: int):
    # Initialize Supabase client
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY) if SUPABASE_URL and SUPABASE_KEY else None
    
    if not supabase:
        print("Supabase client not initialized. Cannot update run status.", file=sys.stderr)
        return

    # Update status to running
    supabase.table("pipeline_runs").update({"status": "running"}).eq("id", run_id).execute()
    await append_log(supabase, run_id, "info", f"Deployment initiated: Keyword \"{keyword}\"")

    try:
        # Build command
        script_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "scripts", "last30days.py"))
        
        args = [
            script_path,
            keyword,
            "--emit", "json",
            "--days", str(days_back),
            "--search", ",".join(platforms)
        ]
        
        if os.environ.get("ENGINE_MOCK") == "true":
            args.append("--mock")
            
        env = os.environ.copy()
        env["PYTHONPATH"] = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "scripts"))

        import subprocess
        process = await asyncio.create_subprocess_exec(
            "python3", *args,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            env=env
        )

        stdout_buffer = []

        # Stream stderr
        async def read_stderr():
            if not process.stderr: return
            while True:
                line = await process.stderr.readline()
                if not line:
                    break
                decoded_line = line.decode('utf-8').strip()
                if not decoded_line:
                    continue
                
                lower_line = decoded_line.lower()
                is_success = any(word in lower_line for word in ['success', 'found', 'completed', 'extracted'])
                is_warn = any(word in lower_line for word in ['warning', 'error', 'failed', 'timeout'])
                
                log_type = "warn" if is_warn else ("success" if is_success else "info")
                await append_log(supabase, run_id, log_type, decoded_line)

        # Stream stdout (mostly JSON)
        async def read_stdout():
            if not process.stdout: return
            while True:
                line = await process.stdout.readline()
                if not line:
                    break
                decoded_line = line.decode('utf-8')
                if decoded_line.strip().startswith("{") or decoded_line.strip().startswith("["):
                    stdout_buffer.append(decoded_line)
                elif decoded_line.strip():
                    await append_log(supabase, run_id, "info", decoded_line.strip())

        # Wait for both streams to finish
        await asyncio.gather(
            read_stderr(),
            read_stdout()
        )

        return_code = await process.wait()

        if return_code != 0:
            raise Exception(f"Engine exited with code {return_code}")

        result_json = None
        joined_stdout = "".join(stdout_buffer)
        if joined_stdout.strip():
            # Extract JSON from output securely (in case of leading/trailing texts)
            try:
                import re
                json_match = re.search(r'\{(?:[^{}]|(?(?=\{).*?\}))*\}', joined_stdout, re.DOTALL)
                if json_match:
                    result_json = json.loads(json_match.group(0))
                else:
                    result_json = json.loads(joined_stdout)
            except Exception as e:
                print(f"Failed to parse JSON: {e}", file=sys.stderr)
                # Fallback to direct load
                result_json = json.loads(joined_stdout)

        # Update run with success
        supabase.table("pipeline_runs").update({
            "status": "success",
            "result_json": result_json
        }).eq("id", run_id).execute()
        
        await append_log(supabase, run_id, "success", "Intelligence reconnaissance completed successfully.")

    except Exception as e:
        print(f"Task execution failed: {e}", file=sys.stderr)
        supabase.table("pipeline_runs").update({
            "status": "failed"
        }).eq("id", run_id).execute()
        await append_log(supabase, run_id, "error", str(e))


@app.post("/run")
async def run_pipeline(request: RunRequest, background_tasks: BackgroundTasks):
    try:
        background_tasks.add_task(
            execute_task, 
            run_id=request.run_id, 
            keyword=request.keyword, 
            platforms=request.platforms, 
            days_back=request.daysBack
        )
        return {"status": "accepted", "run_id": request.run_id, "message": "Pipeline execution started in background."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "intentradar-sidecar"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
