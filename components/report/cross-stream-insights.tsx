"use client";

import React from "react";
import { Brain, Zap, Target, TrendingUp } from "lucide-react";

interface Insight {
    title: string;
    content: string;
    type: "trend" | "pain-point" | "opportunity" | "competitor";
}

interface CrossStreamInsightsProps {
    insights: Insight[];
}

const insightIcons = {
    trend: <TrendingUp className="h-4 w-4 text-signal" />,
    "pain-point": <Zap className="h-4 w-4 text-red-400" />,
    opportunity: <Target className="h-4 w-4 text-blue-400" />,
    competitor: <Brain className="h-4 w-4 text-purple-400" />,
};

export function CrossStreamInsights({ insights }: CrossStreamInsightsProps) {
    return (
        <div className="space-y-8 reveal-item" style={{ animationDelay: "0.6s" }}>
            <div className="flex items-center gap-3">
                <Brain className="h-5 w-5 text-signal" />
                <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] font-bold">Cross-Stream Intelligence</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {insights.map((insight, idx) => (
                    <div key={idx} className="bg-surface p-6 border-l-2 border-border hover:border-signal transition-all space-y-3 group">
                        <div className="flex items-center gap-2">
                            {insightIcons[insight.type]}
                            <span className="font-mono text-[9px] uppercase tracking-widest text-text-secondary opacity-60">
                                {insight.type.replace("-", " ")}
                            </span>
                        </div>
                        <h4 className="font-ui text-lg font-bold text-text-primary group-hover:text-signal transition-colors uppercase tracking-tight">
                            {insight.title}
                        </h4>
                        <p className="font-ui text-sm text-text-secondary leading-relaxed">
                            {insight.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
