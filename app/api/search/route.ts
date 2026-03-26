import { NextRequest } from "next/server";

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
                sendEvent({ type: "info", message: `Initializing reconnaissance for: "${keyword}"`, timestamp: new Date().toLocaleTimeString() });

                // Mocking the engine steps for now
                // Step 1: Platform targeting
                await new Promise(r => setTimeout(r, 800));
                sendEvent({ type: "info", message: `Targeting streams: ${platforms.join(", ")}`, timestamp: new Date().toLocaleTimeString() });

                // Step 2: Signal Interception
                for (const platform of platforms) {
                    await new Promise(r => setTimeout(r, 1200));
                    sendEvent({ type: "info", message: `Intercepting signals from ${platform.toUpperCase()}...`, timestamp: new Date().toLocaleTimeString() });
                    sendEvent({ type: "success", message: `Found signals in ${platform} community clusters.`, timestamp: new Date().toLocaleTimeString() });
                }

                // Step 3: Analysis
                await new Promise(r => setTimeout(r, 1000));
                sendEvent({ type: "info", message: "Processing signals through intent scoring engine...", timestamp: new Date().toLocaleTimeString() });

                await new Promise(r => setTimeout(r, 1500));
                sendEvent({ type: "success", message: "Intelligence report compiled successfully.", timestamp: new Date().toLocaleTimeString() });

                // Final Event: Done
                sendEvent({ type: "done", reportId: "mock-id-123" });
                controller.close();
            } catch (error) {
                sendEvent({ type: "error", message: "Sat-link failed. Reconnaissance aborted.", timestamp: new Date().toLocaleTimeString() });
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
