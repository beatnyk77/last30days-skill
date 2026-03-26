"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
    MessageSquare, // Reddit
    Twitter,       // X
    Youtube,       // Youtube
    Globe,         // HN
    Zap            // Polymarket
} from "lucide-react";

const platforms = [
    { id: "reddit", name: "Reddit", icon: MessageSquare, color: "hover:text-[#FF4500]" },
    { id: "x", name: "X / Twitter", icon: Twitter, color: "hover:text-[#F0EDE6]" },
    { id: "youtube", name: "YouTube", icon: Youtube, color: "hover:text-[#FF0000]" },
    { id: "hn", name: "Hacker News", icon: Globe, color: "hover:text-[#FF6600]" },
    { id: "polymarket", name: "Polymarket", icon: Zap, color: "hover:text-[#E8FF47]" },
];

interface PlatformSelectorProps {
    selected: string[];
    onChange: (selected: string[]) => void;
}

export function PlatformSelector({ selected, onChange }: PlatformSelectorProps) {
    const togglePlatform = (id: string) => {
        if (selected.includes(id)) {
            if (selected.length > 1) {
                onChange(selected.filter(p => p !== id));
            }
        } else {
            onChange([...selected, id]);
        }
    };

    return (
        <div className="flex flex-wrap gap-3">
            {platforms.map((p) => {
                const isActive = selected.includes(p.id);

                return (
                    <button
                        key={p.id}
                        onClick={() => togglePlatform(p.id)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 border rounded-sm transition-all duration-300 font-mono text-[10px] uppercase tracking-widest",
                            isActive
                                ? "bg-signal/5 border-signal text-signal shadow-[0_0_15px_rgba(232,255,71,0.1)]"
                                : "bg-surface/50 border-border text-text-secondary hover:border-text-secondary/50",
                            p.color
                        )}
                    >
                        <p.icon className={cn("h-3.5 w-3.5", isActive ? "opacity-100" : "opacity-40")} />
                        {p.name}
                    </button>
                );
            })}
        </div>
    );
}
