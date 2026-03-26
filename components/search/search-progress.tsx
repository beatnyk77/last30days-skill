"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Terminal, Shield, Eye, AlertCircle } from "lucide-react";

interface LogEntry {
    type: "info" | "success" | "error" | "warn";
    message: string;
    timestamp: string;
}

interface SearchProgressProps {
    logs: LogEntry[];
    status: "idle" | "running" | "complete" | "error";
    keyword: string;
}

export function SearchProgress({ logs, status, keyword }: SearchProgressProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    if (status === "idle") return null;

    return (
        <div className="w-full bg-[#0A0A0B] border border-border rounded-sm overflow-hidden flex flex-col h-[400px] reveal-item shadow-2xl">
            {/* Terminal Header */}
            <div className="h-10 border-b border-border bg-surface flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                    <Terminal className="h-3.5 w-3.5 text-signal" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-text-secondary">Recon Unit: {keyword || "STDBY"}</span>
                </div>
                <div className="flex items-center gap-4">
                    {status === "running" && (
                        <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                            <span className="font-mono text-[8px] uppercase text-signal tracking-tighter">Scanning...</span>
                        </div>
                    )}
                    <div className="flex gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-border" />
                        <div className="h-1.5 w-1.5 rounded-full bg-border" />
                    </div>
                </div>
            </div>

            {/* Terminal Content */}
            <div
                ref={scrollRef}
                className="flex-1 p-6 font-mono text-[11px] overflow-y-auto space-y-2 selection:bg-signal selection:text-background"
            >
                {logs.length === 0 && (
                    <div className="opacity-30 italic">Establishing connection to reconnaissance satellites...</div>
                )}
                {logs.map((log, i) => (
                    <div key={i} className="flex gap-4 group">
                        <span className="text-muted-foreground opacity-30 select-none">[{log.timestamp}]</span>
                        <span className={cn(
                            "flex-1 leading-relaxed",
                            log.type === "success" && "text-signal",
                            log.type === "error" && "text-alert",
                            log.type === "warn" && "text-warm",
                            log.type === "info" && "text-text-primary"
                        )}>
                            {log.type === "info" && "· "}
                            {log.type === "success" && "✔ "}
                            {log.type === "error" && "⚠ "}
                            {log.message}
                        </span>
                    </div>
                ))}
                {status === "running" && (
                    <div className="flex gap-4 animate-pulse">
                        <span className="text-muted-foreground opacity-30 select-none">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                        <span className="text-signal tracking-[0.2em]">_</span>
                    </div>
                )}
            </div>

            {/* Terminal Footer */}
            <div className="h-12 border-t border-border bg-[#0A0A0B] flex items-center justify-between px-6">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Shield className="h-3 w-3 text-muted-foreground" />
                        <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">SSL Secure</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Eye className="h-3 w-3 text-muted-foreground" />
                        <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">{logs.length} Signals Intercepted</span>
                    </div>
                </div>
                <div className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground italic">
                    Tactical Intelligence v2.9.5
                </div>
            </div>
        </div>
    );
}
