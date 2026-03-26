import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { consumeCredit } from "@/lib/actions/credits";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    const session = await auth.api.getSession({
        headers: await import("next/headers").then(h => h.headers())
    });

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { keyword, platforms, daysBack } = await req.json();

    try {
        // Deduct credit before starting
        await consumeCredit(session.user.id);

        const supabase = await createClient();

        // Create async job record
        const { data, error } = await supabase.from("pipeline_runs").insert({
            user_id: session.user.id,
            keyword: keyword,
            status: "pending",
            logs: [{
                type: "info",
                message: "Tactical credit verified. Initializing reconnaissance sidecar...",
                timestamp: new Date().toLocaleTimeString()
            }]
        }).select("id").single();

        if (error) throw new Error(`Failed to create pipeline run: ${error.message}`);

        const runId = data.id;

        // Async fire-and-forget to python sidecar
        const sidecarUrl = process.env.SIDECAR_URL || "http://localhost:8000";

        fetch(`${sidecarUrl}/run`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                run_id: runId,
                keyword,
                platforms,
                daysBack: daysBack || 30
            })
        }).catch(err => {
            console.error("Sidecar dispatch error:", err);
            // We do not await this, so if it fails, it fails asynchronously,
            // but we could try to mark the run as failed in Supabase.
            supabase.from("pipeline_runs").update({
                status: "failed",
                logs: [{ type: "error", message: "Sidecar unreachable.", timestamp: new Date().toLocaleTimeString() }]
            }).eq("id", runId).then();
        });

        // Return immediately with the job ID for the frontend to poll
        return NextResponse.json({ run_id: runId, status: "pending" });

    } catch (error: any) {
        console.error("Search initialization error:", error);
        return NextResponse.json({ error: error.message || "Intelligence engine initialization failed." }, { status: 500 });
    }
}
