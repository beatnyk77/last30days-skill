"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { SearchCommand } from "@/components/search/search-command";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    return (
        <div className="space-y-12">
            <PageHeader
                title="Intelligence Operations"
                description="Monitor global intent signals across Reddit, X, and the decentralized web in real-time."
            />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-12">
                    {/* SEARCH HUB */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-4 w-[2px] bg-signal" />
                            <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] font-bold">Initiate Reconnaissance</h3>
                        </div>
                        <SearchCommand />
                    </section>

                    {/* RECENT OPERATIONS */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-4 w-[2px] bg-border" />
                                <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] font-bold">Recent Intelligence Units</h3>
                            </div>
                            <button className="font-mono text-[9px] uppercase text-signal hover:underline">View All Units →</button>
                        </div>

                        <Card className="bg-surface/30 border-border border-dashed py-20">
                            <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
                                <div className="h-12 w-12 rounded-full border border-border border-dashed flex items-center justify-center">
                                    <Clock className="h-5 w-5 text-muted-foreground opacity-30" />
                                </div>
                                <div className="space-y-1">
                                    <p className="font-display text-xl uppercase tracking-widest opacity-40">No Units Active</p>
                                    <p className="font-ui text-xs text-muted-foreground max-w-[200px]">Perform your first operation to populate this dashboard.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </div>

                {/* SIDE PANEL: SYSTEM STATUS */}
                <div className="space-y-8">
                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-4 w-[2px] bg-border" />
                            <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] font-bold">System Status</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { label: "Active Pipelines", value: "0", icon: Zap, color: "text-signal" },
                                { label: "Reports Generated", value: "0", icon: Activity, color: "text-ice" },
                                { label: "Credits Available", value: "3/10", icon: Shield, color: "text-warm" }
                            ].map((stat, i) => (
                                <div key={i} className="p-6 border border-border bg-surface/50 rounded-sm flex items-center justify-between group hover:border-border/80 transition-colors">
                                    <div className="space-y-1">
                                        <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                                        <p className={cn("font-display text-3xl", stat.color)}>{stat.value}</p>
                                    </div>
                                    <stat.icon className={cn("h-8 w-8 opacity-10", stat.color)} />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* PIPELINE AD */}
                    <Card className="bg-signal text-background overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                            <Zap className="h-24 w-24 fill-current" />
                        </div>
                        <CardHeader className="relative">
                            <CardTitle className="font-display text-3xl leading-[0.9] uppercase">Automate <br /> Recon</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 relative">
                            <p className="font-ui text-[13px] font-medium leading-relaxed">
                                Convert any intelligence unit into a pipeline. Continuous monitoring, zero latency.
                            </p>
                            <Button className="w-full bg-background text-signal hover:bg-background/90 font-bold uppercase tracking-widest text-[10px] h-10 rounded-sm" asChild>
                                <span>Build Pipeline</span>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
