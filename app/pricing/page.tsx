import React from "react";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Shield, Zap, Target, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const tiers = [
    {
        name: "Starter",
        price: "$49",
        description: "For tactical reconnaissance on single products or niche segments.",
        features: [
            "10 Intelligence Reports /mo",
            "3 Active Tactical Pipelines",
            "Standard Engine Fidelity",
            "Web + Reddit Streams",
            "24h Minimum Latency"
        ],
        cta: "Deploy Starter",
        icon: Target,
        highlight: false
    },
    {
        name: "Growth",
        price: "$199",
        description: "For scale-up teams needing cross-stream market intelligence.",
        features: [
            "50 Intelligence Reports /mo",
            "10 Active Tactical Pipelines",
            "High Engine Fidelity (Deep Scan)",
            "Reddit + X + HN + Web Streams",
            "6h Minimum Latency",
            "Slack & Email Webhooks"
        ],
        cta: "Scale Intelligence",
        icon: Zap,
        highlight: true
    },
    {
        name: "Scale",
        price: "$499",
        description: "Enterprise-grade surveillance for dominant market players.",
        features: [
            "Unlimited Intelligence Reports",
            "25 Active Tactical Pipelines",
            "Priority Engine Processing",
            "All Streams (incl. YouTube/TikTok)",
            "1h Real-time Reconnaissance",
            "JSON Webhook Integration",
            "Team Shared Credits"
        ],
        cta: "Enter Surveillance",
        icon: Globe,
        highlight: false
    }
];

export default function PricingPage() {
    return (
        <div className="space-y-12 animate-in fade-in duration-1000 max-w-7xl mx-auto py-12 px-6">
            <div className="text-center space-y-4 reveal-item">
                <h1 className="font-display text-6xl md:text-8xl uppercase tracking-tighter leading-none">
                    Intelligence <span className="italic italic-serif text-signal">Tiers</span>
                </h1>
                <p className="font-ui text-text-secondary text-lg max-w-2xl mx-auto">
                    Select your reconnaissance depth. Higher tiers unlock deeper scanning protocols and lower latency automated pipelines.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
                {tiers.map((tier, idx) => {
                    const Icon = tier.icon;
                    return (
                        <Card key={idx} className={cn(
                            "bg-surface border-border p-10 rounded-sm relative flex flex-col justify-between transition-all duration-500 overflow-hidden group hover:border-signal/50",
                            tier.highlight ? "border-signal/40 shadow-[0_0_50px_-12px_rgba(232,255,71,0.2)]" : ""
                        )}>
                            {tier.highlight && (
                                <div className="absolute top-0 left-0 right-0 bg-signal text-background font-mono text-[9px] uppercase tracking-[0.3em] font-bold text-center py-1.5 z-10">
                                    Recommended Protocol
                                </div>
                            )}

                            <div className="space-y-8 relative z-10">
                                <div className="space-y-4">
                                    <div className="h-12 w-12 bg-surface-lighter border border-border flex items-center justify-center rounded-sm group-hover:bg-signal group-hover:text-background transition-colors duration-500">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="font-display text-3xl uppercase tracking-tight">{tier.name}</h3>
                                    <p className="font-ui text-sm text-text-secondary leading-relaxed h-10">{tier.description}</p>
                                </div>

                                <div className="flex items-baseline gap-2 pb-6 border-b border-border/50">
                                    <span className="font-display text-6xl">{tier.price}</span>
                                    <span className="font-mono text-[10px] text-muted-foreground uppercase">/ Month</span>
                                </div>

                                <ul className="space-y-4">
                                    {tier.features.map((feature, fidx) => (
                                        <li key={fidx} className="flex items-start gap-3">
                                            <Check className="h-4 w-4 text-signal mt-0.5 shrink-0" />
                                            <span className="font-ui text-sm text-text-primary">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-12 relative z-10">
                                <Button className={cn(
                                    "w-full font-mono text-xs uppercase tracking-[0.2em] font-bold h-14 rounded-none transition-all",
                                    tier.highlight ? "bg-signal text-background hover:bg-signal/90" : "bg-text-primary text-background hover:bg-signal hover:text-background"
                                )}>
                                    {tier.cta}
                                </Button>
                            </div>

                            {/* Decorative Element */}
                            <div className="absolute -bottom-20 -right-20 h-64 w-64 bg-signal/5 blur-[100px] rounded-full pointer-events-none" />
                        </Card>
                    );
                })}
            </div>

            {/* Trust Signals */}
            <div className="pt-24 border-t border-border grid grid-cols-1 md:grid-cols-4 gap-12 reveal-item" style={{ animationDelay: "0.2s" }}>
                <div className="space-y-3">
                    <Shield className="h-5 w-5 text-signal" />
                    <h4 className="font-mono text-[11px] uppercase tracking-widest font-bold">Encrypted Streams</h4>
                    <p className="font-ui text-xs text-text-secondary leading-relaxed">All reconnaissance data is encrypted at rest and in transit using military-grade AES-256 protocols.</p>
                </div>
                <div className="space-y-3">
                    <Zap className="h-5 w-5 text-signal" />
                    <h4 className="font-mono text-[11px] uppercase tracking-widest font-bold">Credit Zero</h4>
                    <p className="font-ui text-xs text-text-secondary leading-relaxed">Failed scans or zero-signal reports return 100% of credits to your tactical balance.</p>
                </div>
                <div className="space-y-3">
                    <Target className="h-5 w-5 text-signal" />
                    <h4 className="font-mono text-[11px] uppercase tracking-widest font-bold">Accuracy Guarantee</h4>
                    <p className="font-ui text-xs text-text-secondary leading-relaxed">Verified by cross-stream correlation scoring. 98% intent signal accuracy benchmark.</p>
                </div>
                <div className="space-y-3">
                    <Globe className="h-5 w-5 text-signal" />
                    <h4 className="font-mono text-[11px] uppercase tracking-widest font-bold">Global Coverage</h4>
                    <p className="font-ui text-xs text-text-secondary leading-relaxed">Monitoring 15+ data streams globally including Reddit, X, HN, and localized Predict markets.</p>
                </div>
            </div>
        </div>
    );
}
