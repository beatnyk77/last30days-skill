import { spawn } from "child_process";
import path from "path";
import fs from "fs";

export interface RunnerOptions {
    keyword: string;
    platforms: string[];
    daysBack?: number;
    onLog?: (log: { type: "info" | "success" | "error" | "warn"; message: string; timestamp: string }) => void;
}

export async function runIntelligenceEngine(options: RunnerOptions): Promise<any> {
    const { keyword, platforms, daysBack = 30, onLog } = options;
    const scriptPath = path.join(process.cwd(), "scripts", "last30days.py");

    if (!fs.existsSync(scriptPath)) {
        throw new Error(`Engine entry point not found at ${scriptPath}`);
    }

    let stdoutBuffer = "";

    return new Promise((resolve, reject) => {
        const args = [
            scriptPath,
            keyword,
            "--emit", "json",
            "--days", daysBack.toString(),
            "--search", platforms.join(",")
        ];

        if (process.env.ENGINE_MOCK === "true") {
            args.push("--mock");
        }

        const pythonProcess = spawn("python3", args, {
            env: {
                ...process.env,
                PYTHONPATH: path.join(process.cwd(), "scripts")
            }
        });

        onLog?.({
            type: "info",
            message: `Deployment initiated: Keyword "${keyword}"`,
            timestamp: new Date().toLocaleTimeString()
        });

        pythonProcess.stdout.on("data", (data) => {
            const output = data.toString();
            // Check if output is likely JSON start
            if (output.trim().startsWith("{") || output.trim().startsWith("[")) {
                stdoutBuffer += output;
            } else if (output.trim()) {
                onLog?.({
                    type: "info",
                    message: output.trim(),
                    timestamp: new Date().toLocaleTimeString()
                });
            }
        });

        pythonProcess.stderr.on("data", (data) => {
            const error = data.toString().trim();
            if (!error) return;

            // Categorize logs based on keywords
            const isSuccess = /success|found|completed|extracted/i.test(error);
            const isWarn = /warning|error|failed|timeout/i.test(error);

            onLog?.({
                type: isWarn ? "warn" : (isSuccess ? "success" : "info"),
                message: error,
                timestamp: new Date().toLocaleTimeString()
            });
        });

        pythonProcess.on("close", (code) => {
            if (code !== 0) {
                reject(new Error(`Engine exited with code ${code}`));
                return;
            }

            try {
                if (stdoutBuffer.trim()) {
                    const result = JSON.parse(stdoutBuffer);
                    resolve(result);
                    return;
                }

                const homeDir = process.env.HOME || process.env.USERPROFILE || "";
                const reportPath = path.join(homeDir, ".local", "share", "last30days", "out", "report.json");

                if (fs.existsSync(reportPath)) {
                    const result = JSON.parse(fs.readFileSync(reportPath, "utf-8"));
                    resolve(result);
                } else {
                    resolve({ success: true, message: "No structured data output." });
                }
            } catch (e) {
                resolve({ success: true, message: "Operation complete." });
            }
        });
    });
}
