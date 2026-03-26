"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlatformSelector } from "./platform-selector";
import { FilterDrawer } from "./filter-drawer";
import { Search, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

import { SearchProgress } from "./search-progress";

export function SearchCommand() {
    const [keyword, setKeyword] = useState("");
    const [platforms, setPlatforms] = useState(["reddit", "x", "youtube", "hn"]);
    const [isSearching, setIsSearching] = useState(false);
    const [status, setStatus] = useState<"idle" | "running" | "complete" | "error">("idle");
    const [logs, setLogs] = useState<any[]>([]);

    const handleSearch = async () => {
        if (!keyword) return;

        setLogs([]);
        setIsSearching(true);
        setStatus("running");

        try {
            const response = await fetch("/api/search", {
                method: "POST",
                body: JSON.stringify({ keyword, platforms, daysBack: 30 }),
                headers: { "Content-Type": "application/json" }
            });

            if (!response.body) return;
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split("\n\n");

                for (const line of lines) {
                    if (line.startsWith("data: ")) {
                        try {
                            const data = JSON.parse(line.replace("data: ", ""));
                            if (data.type === "done") {
                                setStatus("complete");
                                setIsSearching(false);
                                // Redirect to report page in production
                            } else {
                                setLogs(prev => [...prev, data]);
                            }
                        } catch (e) {
                            console.error("Failed to parse SSE line:", line);
                        }
                    }
                }
            }
        } catch (error) {
            setStatus("error");
            setIsSearching(false);
            setLogs(prev => [...prev, { type: "error", message: "Connection lost.", timestamp: new Date().toLocaleTimeString() }]);
        }
    };

    return (
        <div className="w-full space-y-12">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-signal/20 to-ice/20 blur opacity-25 group-focus-within:opacity-100 transition-opacity rounded-sm" />
                <div className="relative flex flex-col gap-4 p-6 bg-surface border border-border rounded-sm shadow-2xl">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-sm bg-[#0A0A0B] border border-border flex items-center justify-center">
                            <Search className={cn("h-5 w-5 transition-colors", keyword ? "text-signal" : "text-muted-foreground")} />
                        </div>
                        <Input
                            placeholder="Inject keyword to reveal intent signals..."
                            className="bg-transparent border-0 focus-visible:ring-0 text-2xl h-14 font-display tracking-tight placeholder:opacity-30"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        />
                    </div>

                    <div className="h-px bg-border/50 w-full" />

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
                        <div className="space-y-3">
                            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Target Streams</span>
                            <PlatformSelector selected={platforms} onChange={setPlatforms} />
                        </div>

                        <div className="flex items-center gap-3 self-end md:self-center">
                            <FilterDrawer />
                            <Button
                                onClick={handleSearch}
                                disabled={!keyword || isSearching}
                                className="bg-signal text-background hover:bg-signal/90 font-bold uppercase tracking-widest h-11 px-8 rounded-sm shadow-[0_0_20px_rgba(232,255,71,0.2)] group"
                            >
                                {isSearching ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        Deploy Scan
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {status !== "idle" && (
                <SearchProgress logs={logs} status={status} keyword={keyword} />
            )}

            {/* Suggested Keywords (Micro-interactions) */}
            <div className="flex items-center gap-4 reveal-item" style={{ animationDelay: "0.4s" }}>
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Recent Targets //</span>
                <div className="flex flex-wrap gap-2">
                    {["alternatives to asana", "is mercari safe", "best k8s monitoring"].map((tag) => (
                        <button
                            key={tag}
                            onClick={() => {
                                setKeyword(tag);
                                // Optional: trigger search immediately?
                            }}
                            className="text-[10px] font-ui px-3 py-1 border border-border hover:border-signal/30 hover:text-signal transition-all rounded-full bg-surface/30"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
