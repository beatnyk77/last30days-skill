"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, ShieldCheck, Zap, Globe, Target } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
    const [keyword, setKeyword] = useState("");

    return (
        <div className="flex flex-col">
            {/* SECTION 1: HERO */}
            <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-signal/10 blur-[120px] rounded-full opacity-20" />
                </div>

                <div className="max-w-6xl mx-auto px-8 w-full z-10 text-center space-y-12">
                    <div className="space-y-6 reveal-item">
                        <div className="flex justify-center">
                            <span className="px-4 py-1.5 border border-signal/20 bg-signal/5 text-signal font-mono text-[10px] uppercase tracking-[0.2em] rounded-full">
                                Phase 1 Reconnaissance Active
                            </span>
                        </div>
                        <h1 className="font-display text-7xl md:text-9xl leading-[0.85] tracking-tighter text-text-primary uppercase">
                            Reveal <span className="text-signal italic italic-serif">Intent</span> <br /> Before the Click.
                        </h1>
                        <p className="font-ui text-text-secondary text-xl max-w-2xl mx-auto leading-relaxed">
                            Industrial-grade intelligence for high-growth teams. We scan millions of signals across 5 platforms to find your next customer — 30 days before they find you.
                        </p>
                    </div>

                    {/* Live Search Mock Input */}
                    <div className="max-w-2xl mx-auto w-full relative reveal-item" style={{ animationDelay: "0.2s" }}>
                        <div className="flex items-center p-2 bg-surface border border-border rounded-sm focus-within:border-signal transition-all shadow-2xl">
                            <Search className="ml-4 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Enter keyword (e.g. 'alternatives to asana')"
                                className="bg-transparent border-0 focus-visible:ring-0 text-lg h-12 font-ui"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <Button className="bg-signal text-background hover:bg-signal/90 font-bold px-8 h-12 rounded-sm uppercase text-[11px] tracking-widest ml-2">
                                Initiate Scan →
                            </Button>
                        </div>
                        <div className="flex justify-center gap-6 mt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground opacity-60">
                            <span className="flex items-center gap-2 underline underline-offset-4 decoration-border">r/saas</span>
                            <span className="flex items-center gap-2 underline underline-offset-4 decoration-border">r/devops</span>
                            <span className="flex items-center gap-2 underline underline-offset-4 decoration-border">X/Twitter</span>
                            <span className="flex items-center gap-2 underline underline-offset-4 decoration-border">YouTube</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: REPORT PREVIEW (MOCK) */}
            <section className="py-32 border-y border-border bg-surface/[0.2]">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal">Signal Architecture</span>
                                <h2 className="font-display text-5xl tracking-tight leading-tight uppercase">High-Fidelity <br /> Intelligence.</h2>
                            </div>
                            <p className="font-ui text-lg text-text-secondary leading-relaxed">
                                Our engine doesn't just scrape; it classifies. We map every keyword mention to a 5-stage intent framework, revealing exactly where your prospects are in the buying cycle.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <Target className="h-6 w-6 text-signal" />
                                    <h4 className="font-mono text-[11px] uppercase tracking-widest text-text-primary">Precision Scoring</h4>
                                    <p className="font-ui text-xs text-text-secondary">AI-driven sentiment and stage classification.</p>
                                </div>
                                <div className="space-y-2">
                                    <Globe className="h-6 w-6 text-ice" />
                                    <h4 className="font-mono text-[11px] uppercase tracking-widest text-text-primary">Cross-Platform</h4>
                                    <p className="font-ui text-xs text-text-secondary">Unified view of Reddit, X, and technical forums.</p>
                                </div>
                            </div>
                        </div>

                        {/* Report Preview Visual */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-signal/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="bg-surface border border-border p-8 rounded-sm shadow-2xl relative">
                                <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
                                    <div>
                                        <span className="font-mono text-[9px] uppercase text-muted-foreground mr-2">Report //</span>
                                        <span className="font-display text-xl uppercase tracking-widest italic font-bold">Asana Competitors</span>
                                    </div>
                                    <div className="h-2 w-2 rounded-full bg-signal animate-pulse" />
                                </div>

                                <div className="space-y-6">
                                    {[
                                        { text: "Looking for an Asana alternative for a 50-person team...", stage: 5, platform: "Reddit" },
                                        { text: "Does anyone here have experience moving from Asana to ClickUp?", stage: 4, platform: "X" },
                                        { text: "Is Asana worth the new price hike?", stage: 2, platform: "Reddit" }
                                    ].map((s, i) => (
                                        <div key={i} className="p-4 border border-border bg-[#0A0A0B]/50 flex items-start justify-between gap-4">
                                            <p className="font-ui text-[13px] text-text-primary leading-snug">"{s.text}"</p>
                                            <div className="flex flex-col items-end gap-1">
                                                <span className="font-mono text-[9px] text-signal uppercase tracking-widest">Stage {s.stage}</span>
                                                <span className="font-mono text-[8px] text-muted-foreground uppercase">{s.platform}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: HOW IT WORKS */}
            <section id="features" className="py-32">
                <div className="max-w-7xl mx-auto px-8 text-center space-y-20">
                    <div className="space-y-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">The Protocol //</span>
                        <h2 className="font-display text-6xl tracking-tighter uppercase">From Keyword to <span className="text-signal">Pipeline</span>.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Deploy Scan",
                                desc: "Inject your target keywords. Our engine initiates a deep reconnaissance across technical and social streams.",
                                icon: Search
                            },
                            {
                                step: "02",
                                title: "Process Intelligence",
                                desc: "We analyze context, sentiment, and metadata to filter the noise and reveal high-intent signals.",
                                icon: ShieldCheck
                            },
                            {
                                step: "03",
                                title: "Automate Pipeline",
                                desc: "Set and forget. IntentRadar continuously monitors for new signals and notifies your team in real-time.",
                                icon: Zap
                            }
                        ].map((item, i) => (
                            <div key={i} className="p-10 border border-border bg-surface/[0.2] text-left space-y-6 relative overflow-hidden group hover:border-signal/30 transition-colors">
                                <span className="font-mono text-[10px] text-signal/40 tracking-[0.5em] group-hover:text-signal transition-colors">{item.step} //</span>
                                <item.icon className="h-8 w-8 text-signal" />
                                <h3 className="font-display text-4xl leading-[0.9] uppercase tracking-tight">{item.title}</h3>
                                <p className="font-ui text-text-secondary leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 4: FINAL CTA */}
            <section className="py-40 bg-signal">
                <div className="max-w-4xl mx-auto px-8 text-center space-y-12">
                    <h2 className="font-display text-7xl md:text-9xl leading-[0.8] tracking-tighter text-background uppercase italic font-bold">
                        Target. Reveal. Convert.
                    </h2>
                    <p className="font-ui text-background/80 text-xl max-w-xl mx-auto font-medium">
                        Stop hoping they click. Start knowing they will. Ready to deploy the protocol?
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                        <Link href="/signup">
                            <Button size="lg" className="h-16 px-12 bg-background text-signal hover:bg-background/90 text-lg font-bold rounded-sm uppercase tracking-widest">
                                Deploy System →
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button variant="outline" size="lg" className="h-16 px-12 border-background/20 text-background hover:bg-background/10 text-lg font-bold rounded-sm uppercase tracking-widest">
                                Operator Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
