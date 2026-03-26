"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { FileText, Radio, Zap, Target } from "lucide-react";

const stats = [
    { label: "Intelligence Reports", value: "24", icon: FileText, change: "+3 this week" },
    { label: "Active Pipelines", value: "8", icon: Radio, change: "2 running" },
    { label: "Total Signals", value: "1.2k", icon: Zap, change: "+124 today" },
    { label: "Avg Buyer Stage", value: "3.2", icon: Target, change: "Trending Up" },
];

export function StatsCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
                <Card key={idx} className="bg-surface border-border p-6 rounded-sm space-y-4 hover:border-signal/30 transition-all group">
                    <div className="flex items-center justify-between">
                        <div className="h-10 w-10 bg-surface-lighter border border-border flex items-center justify-center rounded-sm group-hover:bg-signal group-hover:text-background transition-colors">
                            <stat.icon className="h-5 w-5" />
                        </div>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-signal opacity-0 group-hover:opacity-100 transition-opacity">Live Data</span>
                    </div>
                    <div className="space-y-1">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary opacity-60">{stat.label}</p>
                        <h3 className="font-display text-4xl text-text-primary">{stat.value}</h3>
                    </div>
                    <p className="font-mono text-[9px] uppercase tracking-tighter text-text-secondary">{stat.change}</p>
                </Card>
            ))}
        </div>
    );
}
