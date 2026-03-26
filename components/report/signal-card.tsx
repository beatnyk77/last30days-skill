"use client";

import React from "react";
import { Signal } from "@/lib/last30days/types";
import { cn } from "@/lib/utils";
import { ExternalLink, MessageSquare, ThumbsUp, TrendingUp, Play, MessageCircle, Globe, Hash } from "lucide-react";

interface SignalCardProps {
    signal: Signal;
}

const sourceIcons = {
    reddit: <Hash className="h-3 w-3" />,
    x: <MessageCircle className="h-3 w-3" />,
    youtube: <Play className="h-3 w-3" />,
    hn: <Hash className="h-3 w-3" />,
    tiktok: <TrendingUp className="h-3 w-3" />,
    web: <Globe className="h-3 w-3" />,
};

export function SignalCard({ signal }: SignalCardProps) {
    return (
        <div className="group bg-surface p-6 border border-border hover:border-signal/50 transition-all space-y-4 rounded-sm relative overflow-hidden">
            {/* Intent Badge */}
            <div className={cn(
                "absolute top-0 right-0 px-3 py-1 font-mono text-[9px] uppercase tracking-widest",
                signal.intentStage > 3 ? "bg-signal text-background" : "bg-border text-text-secondary"
            )}>
                {signal.intentStage === 5 ? "Critical Intent" : `Stage ${signal.intentStage}`}
            </div>

            <div className="flex items-center gap-2">
                <div className="h-6 w-6 bg-surface-lighter flex items-center justify-center border border-border">
                    {sourceIcons[signal.source] || <Globe className="h-3 w-3" />}
                </div>
                <span className="font-mono text-[10px] text-text-secondary uppercase tracking-tighter">
                    {signal.source} • {signal.author}
                </span>
            </div>

            <div className="space-y-2">
                <h4 className="font-ui text-base font-bold text-text-primary leading-tight line-clamp-2">
                    {signal.title}
                </h4>
                <p className="font-ui text-[13px] text-text-secondary leading-relaxed line-clamp-3 italic">
                    "{signal.snippet}"
                </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="flex items-center gap-4">
                    {signal.metrics.upvotes !== undefined && (
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-text-secondary">
                            <ThumbsUp className="h-3 w-3" />
                            {signal.metrics.upvotes}
                        </div>
                    )}
                    {signal.metrics.comments !== undefined && (
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-text-secondary">
                            <MessageSquare className="h-3 w-3" />
                            {signal.metrics.comments}
                        </div>
                    )}
                </div>

                <a
                    href={signal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 w-8 flex items-center justify-center bg-surface-lighter hover:bg-signal hover:text-background border border-border transition-colors grayscale hover:grayscale-0"
                >
                    <ExternalLink className="h-3.5 w-3.5" />
                </a>
            </div>
        </div>
    );
}
