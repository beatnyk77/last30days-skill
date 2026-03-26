"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Settings, Clock, Activity } from "lucide-react";

const pipelines = [
    { id: "1", name: "Enterprise SaaS Detect", interval: "24h", signals: 12, status: "active" },
    { id: "2", name: "Competitor Pricing Radar", interval: "6h", signals: 8, status: "active" },
    { id: "3", name: "AI Talent Migration", interval: "72h", signals: 45, status: "paused" },
];

export function ActivePipelines() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] font-bold">Tactical Pipelines</h3>
                <Button variant="ghost" size="sm" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-signal">Manage All</Button>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {pipelines.map((p) => (
                    <Card key={p.id} className="bg-surface border-border p-4 hover:border-signal/30 transition-all rounded-sm group">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className={`h-2 w-2 rounded-full ${p.status === "active" ? "bg-signal animate-pulse" : "bg-muted-foreground"}`} />
                                <div>
                                    <h4 className="font-ui text-sm font-bold text-text-primary uppercase tracking-tight">{p.name}</h4>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="flex items-center gap-1 font-mono text-[9px] text-text-secondary uppercase">
                                            <Clock className="h-3 w-3" /> {p.interval}
                                        </span>
                                        <span className="flex items-center gap-1 font-mono text-[9px] text-text-secondary uppercase">
                                            <Activity className="h-3 w-3" /> {p.signals} new
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-signal/10 hover:text-signal">
                                    <Settings className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-signal/10 hover:text-signal">
                                    <Play className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}

                <Button variant="outline" className="w-full border-dashed border-border py-8 font-mono text-[10px] uppercase tracking-widest hover:border-signal hover:text-signal transition-all">
                    Initialize New Pipeline
                </Button>
            </div>
        </div>
    );
}
