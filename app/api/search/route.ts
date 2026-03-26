import { NextRequest } from "next/server";
import { runIntelligenceEngine } from "@/lib/last30days/runner";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    const { keyword, platforms, daysBack } = await req.json();

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        async start(controller) {
            const sendEvent = (data: any) => {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
            };

            try {
                // Invoke the live engine
                const result = await runIntelligenceEngine({
                    keyword,
                    platforms,
                    daysBack: daysBack || 30,
                    onLog: (log) => {
                        sendEvent(log);
                    }
                });

                // Final Event: Done with the actual report data or ID
                sendEvent({ type: "done", result });
                controller.close();
            } catch (error: any) {
                console.error("Engine execution error:", error);
                sendEvent({
                    type: "error",
                    message: error.message || "Intelligence engine failed.",
                    timestamp: new Date().toLocaleTimeString()
                });
                controller.close();
            }
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    });
}
