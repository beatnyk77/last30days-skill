"use client";

import React from "react";
import { PlatformStat } from "@/lib/last30days/types";
import { Card } from "@/components/ui/card";
import { Hash, MessageCircle, Play, Globe, TrendingUp } from "lucide-react";

interface PlatformBreakdownProps {
    stats: PlatformStat[];
}

const platformConfig: Record<string, { icon: React.ReactNode; color: string }> = {
    reddit: { icon: <Hash className="h-4 w-4" />, color: "text-[#FF4500]" },
    x: { icon: <MessageCircle className="h-4 w-4" />, color: "text-white" }, // Modern X
    youtube: { icon: <Play className="h-4 w-4" />, color: "text-[#FF0000]" },
    web: { icon: <Globe className="h-4 w-4" />, color: "text-blue-400" },
    tiktok: { icon: <TrendingUp className="h-4 w-4" />, color: "text-[#EE1D52]" },
};

export function PlatformBreakdown({ stats }: PlatformBreakdownProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 reveal-item" style={{ animationDelay: "0.4s" }}>
            {stats.map((stat) => (
                <Card key={stat.platform} className="bg-surface border-border p-5 space-y-4 rounded-sm">
                    <div className="flex items-center justify-between">
                        <div className="p-2 bg-surface-lighter border border-border rounded-sm">
                            {platformConfig[stat.platform.toLowerCase()]?.icon || <Globe className="h-4 w-4" />}
                        </div>
                        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                            {Math.round(stat.avgRelevance * 100)}% REL
                        </span>
                    </div>

                    <div>
                        <p className="font-mono text-[9px] uppercase tracking-widest text-text-secondary opacity-60">Signals</p>
                        <h4 className="font-display text-4xl leading-none text-text-primary">{stat.count}</h4>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                        {stat.topTags.map(tag => (
                            <span key={tag} className="text-[9px] font-mono bg-border/40 text-text-secondary px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </Card>
            ))}
        </div>
    );
}
