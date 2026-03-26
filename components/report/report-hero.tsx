"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, Globe, Hash, Shield } from "lucide-react";

interface ReportHeroProps {
    keyword: string;
    timestamp: string;
    sourceCount: number;
    platforms: string[];
}

export function ReportHero({ keyword, timestamp, sourceCount, platforms }: ReportHeroProps) {
    return (
        <div className="space-y-8 pb-12 border-b border-border reveal-item">
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <Badge className="bg-signal/10 text-signal border-signal/20 font-mono text-[9px] uppercase tracking-widest px-3 py-1">
                        <Shield className="h-3 w-3 mr-2" />
                        Verified Intelligence
                    </Badge>
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                        Ref: {Math.random().toString(16).slice(2, 10).toUpperCase()}
                    </span>
                </div>

                <h1 className="font-display text-6xl md:text-8xl tracking-tight uppercase leading-[0.9]">
                    Target: <span className="italic italic-serif text-signal">{keyword}</span>
                </h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span className="font-mono text-[9px] uppercase tracking-widest">Generation Date</span>
                    </div>
                    <p className="font-ui text-[13px] text-text-primary">{timestamp}</p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Globe className="h-3.5 w-3.5" />
                        <span className="font-mono text-[9px] uppercase tracking-widest">Target Streams</span>
                    </div>
                    <p className="font-ui text-[13px] text-text-primary uppercase tracking-tighter">{platforms.join(", ")}</p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Hash className="h-3.5 w-3.5" />
                        <span className="font-mono text-[9px] uppercase tracking-widest">Total Signals</span>
                    </div>
                    <p className="font-ui text-[13px] text-text-primary">{sourceCount} Captured</p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Shield className="h-3.5 w-3.5 text-signal" />
                        <span className="font-mono text-[9px] uppercase tracking-widest">Engine Fidelity</span>
                    </div>
                    <p className="font-ui text-[13px] text-text-primary">Grade A (High)</p>
                </div>
            </div>
        </div>
    );
}
