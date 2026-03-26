import React from "react";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { PipelineCard } from "@/components/pipelines/pipeline-card";
import { Button } from "@/components/ui/button";
import { Plus, Radio } from "lucide-react";
import Link from "next/link";

const mockPipelines = [
    { id: "1", name: "Enterprise SaaS Detect", keyword: "RAG Search", interval: "24h", signals: 12, status: "active", lastRun: "2h ago" },
    { id: "2", name: "Competitor Pricing Radar", keyword: "Vector DB", interval: "6h", signals: 8, status: "active", lastRun: "45m ago" },
    { id: "3", name: "AI Talent Migration", keyword: "AI Engineers", interval: "72h", signals: 45, status: "paused", lastRun: "3d ago" },
    { id: "4", name: "Cybersecurity Intent", keyword: "ZTA Solutions", interval: "12h", signals: 0, status: "error", lastRun: "FAILED" },
] as const;

export default function PipelinesPage() {
    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <DashboardHeader
                heading="Tactical Pipelines"
                text="Manage automated intent reconnaissance streams across multiple platforms."
            >
                <Link href="/pipelines/new">
                    <Button className="bg-signal text-background hover:bg-signal/90 font-mono text-[10px] uppercase tracking-widest font-bold">
                        <Plus className="h-3.5 w-3.5 mr-2" />
                        Init New Pipeline
                    </Button>
                </Link>
            </DashboardHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal-item">
                {mockPipelines.map(p => (
                    <PipelineCard key={p.id} pipeline={p} />
                ))}
            </div>

            {mockPipelines.length === 0 && (
                <div className="h-64 border border-dashed border-border flex flex-col items-center justify-center space-y-4 rounded-sm">
                    <Radio className="h-10 w-10 text-muted-foreground opacity-20" />
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">No active reconnaissance pipelines found.</p>
                </div>
            )}
        </div>
    );
}
