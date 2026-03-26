"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, Settings, Trash2, Clock, Activity, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface PipelineCardProps {
    pipeline: {
        id: string;
        name: string;
        keyword: string;
        interval: string;
        signals: number;
        status: "active" | "paused" | "error";
        lastRun: string;
    };
}

export function PipelineCard({ pipeline }: PipelineCardProps) {
    return (
        <Card className="bg-surface border-border p-6 rounded-sm space-y-6 hover:border-signal/30 transition-all group overflow-hidden relative">
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className={cn(
                            "h-2 w-2 rounded-full",
                            pipeline.status === "active" ? "bg-signal animate-pulse" : (pipeline.status === "error" ? "bg-red-500" : "bg-muted-foreground")
                        )} />
                        <h3 className="font-display text-2xl uppercase tracking-tight text-text-primary">{pipeline.name}</h3>
                    </div>
                    <p className="font-mono text-[10px] text-text-secondary uppercase tracking-[0.2em]">Target: <span className="text-signal">{pipeline.keyword}</span></p>
                </div>

                <Badge variant="outline" className="font-mono text-[9px] uppercase rounded-none border-border">
                    {pipeline.lastRun}
                </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/50">
                <div className="space-y-1">
                    <span className="flex items-center gap-2 font-mono text-[9px] text-text-secondary uppercase tracking-widest">
                        <Clock className="h-3 w-3" /> Frequency
                    </span>
                    <p className="font-ui text-xs font-bold text-text-primary uppercase tracking-tighter">{pipeline.interval}</p>
                </div>
                <div className="space-y-1 text-right">
                    <span className="flex items-center justify-end gap-2 font-mono text-[9px] text-text-secondary uppercase tracking-widest">
                        <Activity className="h-3 w-3" /> Total Signals
                    </span>
                    <p className="font-ui text-xs font-bold text-text-primary uppercase tracking-tighter">{pipeline.signals}</p>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="font-mono text-[9px] uppercase tracking-widest h-8 border-border hover:bg-surface-lighter">
                        <Settings className="h-3.5 w-3.5 mr-2" />
                        Config
                    </Button>
                    <Button size="sm" variant="outline" className="font-mono text-[9px] uppercase tracking-widest h-8 border-border hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50">
                        <Trash2 className="h-3.5 w-3.5 mr-2" />
                        Destroy
                    </Button>
                </div>

                <Button size="sm" className={cn(
                    "font-mono text-[9px] uppercase tracking-widest h-8 font-bold transition-all",
                    pipeline.status === "active" ? "bg-surface-lighter text-text-primary hover:bg-red-500 hover:text-white" : "bg-signal text-background hover:bg-signal/90"
                )}>
                    {pipeline.status === "active" ? (
                        <>
                            <Pause className="h-3.5 w-3.5 mr-2 fill-current" />
                            Halt
                        </>
                    ) : (
                        <>
                            <Play className="h-3.5 w-3.5 mr-2 fill-current" />
                            Deploy
                        </>
                    )}
                </Button>
            </div>

            {/* Decorative Progress Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-signal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </Card>
    );
}
