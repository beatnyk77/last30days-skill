"use client";

import React from "react";
import { cn } from "@/lib/utils";

const stages = [
    { id: 1, name: "Discovery", desc: "High-level research and interest." },
    { id: 2, name: "Validation", desc: "Confirming needs and exploring solutions." },
    { id: 3, name: "Evaluation", desc: "Comparing specific brands or features." },
    { id: 4, name: "Selection", desc: "Nearing a decision (Shortlisting)." },
    { id: 5, name: "Purchase", desc: "Explicit buying intent or urgent need." },
];

interface BuyerStageGaugeProps {
    activeStage: number; // 1-5
    onStageClick?: (stage: number) => void;
}

export function BuyerStageGauge({ activeStage, onStageClick }: BuyerStageGaugeProps) {
    return (
        <div className="w-full space-y-8 reveal-item" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-between">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] font-bold">Intent Stage Distribution</h3>
                <span className="font-mono text-[9px] text-muted-foreground uppercase italic">Click stage to filter signals</span>
            </div>

            <div className="relative">
                {/* Horizontal Gauge Bar */}
                <div className="h-24 w-full bg-surface grid grid-cols-5 border border-border overflow-hidden rounded-sm relative">
                    {stages.map((s) => {
                        const isActive = s.id === activeStage;
                        const isPast = s.id < activeStage;

                        return (
                            <button
                                key={s.id}
                                onClick={() => onStageClick?.(s.id)}
                                className={cn(
                                    "flex flex-col items-center justify-center gap-1 border-r border-border last:border-0 transition-all group relative overflow-hidden",
                                    isActive ? "bg-signal/5" : "hover:bg-surface-lighter"
                                )}
                            >
                                {/* Active Indicator Bar */}
                                <div className={cn(
                                    "absolute top-0 left-0 right-0 h-1 transition-all",
                                    isActive ? "bg-signal" : (isPast ? "bg-signal/20" : "bg-transparent")
                                )} />

                                <span className={cn(
                                    "font-display text-4xl leading-none transition-colors",
                                    isActive ? "text-signal" : "text-muted-foreground opacity-30"
                                )}>
                                    0{s.id}
                                </span>
                                <span className={cn(
                                    "font-mono text-[9px] uppercase tracking-widest",
                                    isActive ? "text-signal font-bold" : "text-muted-foreground opacity-40 group-hover:opacity-100"
                                )}>
                                    {s.name}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Active Stage Description */}
                <div className="mt-6 flex items-start gap-4 p-6 bg-surface/50 border border-border border-dashed rounded-sm">
                    <div className="h-10 w-10 shrink-0 bg-signal text-background flex items-center justify-center font-display text-2xl font-bold">
                        {activeStage}
                    </div>
                    <div className="space-y-1">
                        <h4 className="font-mono text-[11px] uppercase tracking-widest text-text-primary">{stages[activeStage - 1].name} Stage</h4>
                        <p className="font-ui text-sm text-text-secondary leading-relaxed max-w-2xl">
                            {stages[activeStage - 1].desc} Active reconnaissance indicates users in this stage are {activeStage > 3 ? "dangerously close to conversion" : "gathering tactical comparisons"}.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
