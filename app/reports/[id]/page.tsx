import { Metadata } from "next";
import { ReportHero } from "@/components/report/report-hero";
import { BuyerStageGauge } from "@/components/report/buyer-stage-gauge";
import { PlatformBreakdown } from "@/components/report/platform-breakdown";
import { CrossStreamInsights } from "@/components/report/cross-stream-insights";
import { IntentTimeline } from "@/components/report/intent-timeline";
import { ReportExportBar } from "@/components/report/report-export-bar";
import { ReportData } from "@/lib/last30days/types";

import { createClient } from "@/lib/supabase/server";

async function getReportData(id: string): Promise<ReportData> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("pipeline_runs").select("keyword, result_json").eq("id", id).single();

    if (error || !data) {
        throw new Error("Report not found or database error.");
    }

    if (!data.result_json) {
        throw new Error("Report analysis is not yet complete.");
    }

    const result = data.result_json as Partial<ReportData>;

    return {
        id,
        keyword: data.keyword || "Unknown Target",
        summary: result.summary || "Intelligence reconnaissance completed.",
        buyerStage: result.buyerStage || 1,
        timestamp: result.timestamp || new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
        platforms: result.platforms || ["Web"],
        platformStats: result.platformStats || [],
        signals: result.signals || []
    };
}

export const metadata: Metadata = {
    title: "Intelligence Report | IntentRadar",
};

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await getReportData(id);

    return (
        <div className="min-h-screen bg-background p-6 md:p-12 space-y-16 max-w-7xl mx-auto animate-in fade-in duration-1000">
            <ReportHero
                keyword={data.keyword}
                timestamp={data.timestamp}
                sourceCount={data.signals.length}
                platforms={data.platforms}
            />

            <section className="space-y-8">
                <BuyerStageGauge activeStage={data.buyerStage} />
            </section>

            <section className="space-y-8">
                <div className="flex items-center gap-3">
                    <div className="h-px bg-border flex-grow" />
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] font-bold shrink-0">Platform Reconnaissance</h3>
                    <div className="h-px bg-border flex-grow" />
                </div>
                <PlatformBreakdown stats={data.platformStats} />
            </section>

            <section>
                <CrossStreamInsights insights={[
                    { title: "Sovereignty Focus", content: "Strong preference for VPC/On-premise deployments over managed cloud AI services in enterprise segments.", type: "trend" },
                    { title: "RAG Maturation", content: "Discussions have shifted from 'how to build' to 'how to scale' and 'how to secure' retrieval pipelines.", type: "opportunity" }
                ]} />
            </section>

            <section>
                <IntentTimeline signals={data.signals} />
            </section>

            <ReportExportBar />
        </div>
    );
}
