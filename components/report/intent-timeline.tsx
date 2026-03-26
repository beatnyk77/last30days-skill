"use client";

import React from "react";
import { Signal } from "@/lib/last30days/types";
import { SignalCard } from "./signal-card";
import { Clock } from "lucide-react";

interface IntentTimelineProps {
    signals: Signal[];
}

export function IntentTimeline({ signals }: IntentTimelineProps) {
    // Group signals by day
    const groupedSignals = signals.reduce((acc, signal) => {
        const date = new Date(signal.timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit'
        });
        if (!acc[date]) acc[date] = [];
        acc[date].push(signal);
        return acc;
    }, {} as Record<string, Signal[]>);

    return (
        <div className="space-y-12 pb-24 reveal-item" style={{ animationDelay: "0.8s" }}>
            <div className="flex items-center gap-3 border-b border-border pb-4">
                <Clock className="h-5 w-5 text-signal" />
                <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] font-bold">Intent Chronology</h3>
            </div>

            <div className="space-y-16 relative">
                {/* Vertical Timeline Line */}
                <div className="absolute left-[11px] top-4 bottom-4 w-px bg-border hidden md:block" />

                {Object.entries(groupedSignals).map(([date, daySignals]) => (
                    <div key={date} className="relative space-y-6 md:pl-10">
                        {/* Date Marker */}
                        <div className="flex items-center gap-4">
                            <div className="h-6 w-6 rounded-full border-2 border-signal bg-background z-10 shrink-0 hidden md:block" />
                            <div className="font-display text-2xl uppercase tracking-tighter text-text-primary">
                                {date}
                            </div>
                            <div className="h-px bg-border flex-grow mt-1" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {daySignals.map(signal => (
                                <SignalCard key={signal.id} signal={signal} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
