import { Metadata } from "next";
import { ReportHero } from "@/components/report/report-hero";
import { BuyerStageGauge } from "@/components/report/buyer-stage-gauge";
import { PlatformBreakdown } from "@/components/report/platform-breakdown";
import { CrossStreamInsights } from "@/components/report/cross-stream-insights";
import { IntentTimeline } from "@/components/report/intent-timeline";
import { ReportExportBar } from "@/components/report/report-export-bar";
import { ReportData } from "@/lib/last30days/types";

// Mock Data Factor - Replace with real DB fetch
async function getReportData(id: string): Promise<ReportData> {
    return {
        id,
        keyword: "Enterprise Search AI",
        summary: "Significant intent spike detected around RAG-based search solutions and sovereign infrastructure.",
        buyerStage: 4,
        timestamp: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
        platforms: ["Reddit", "X", "HackerNews", "Web"],
        platformStats: [
            { platform: "Reddit", count: 42, avgRelevance: 0.88, topTags: ["AI", "Enterprise", "RAG"] },
            { platform: "X", count: 128, avgRelevance: 0.72, topTags: ["Search", "LLM", "SaaS"] },
            { platform: "HackerNews", count: 18, avgRelevance: 0.95, topTags: ["Tech", "Cloud", "Vector"] },
            { platform: "Web", count: 64, avgRelevance: 0.65, topTags: ["Market", "Trends"] },
            { platform: "YouTube", count: 24, avgRelevance: 0.81, topTags: ["Tutorial", "Demo"] },
        ],
        signals: [
            {
                id: "1",
                source: "reddit",
                url: "#",
                title: "How are enterprise teams actually deploying RAG today?",
                snippet: "We're looking at moving away from standard elasticsearch to a more AI native stack for our 50k+ docs...",
                author: "dev_lead_23",
                timestamp: new Date().toISOString(),
                relevance: 0.92,
                intentStage: 4,
                sentiment: "neutral",
                metrics: { upvotes: 142, comments: 56 }
            },
            {
                id: "2",
                source: "x",
                url: "#",
                title: "Vector DB landscape is heating up in 2025",
                snippet: "Finally seeing real enterprise adoption beyond just the hype. CIOs are asking about sovereignty...",
                author: "tech_analyst",
                timestamp: new Date().toISOString(),
                relevance: 0.85,
                intentStage: 3,
                sentiment: "positive",
                metrics: { likes: 890 }
            },
            {
                id: "3",
                source: "hn",
                url: "#",
                title: "Show HN: AI Search for on-premise documents",
                snippet: "Built this because we couldn't find a solution that guaranteed data wouldn't leave our VPC...",
                author: "founder_x",
                timestamp: new Date().toISOString(),
                relevance: 0.98,
                intentStage: 5,
                sentiment: "positive",
                metrics: { upvotes: 340, comments: 24 }
            }
        ]
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
