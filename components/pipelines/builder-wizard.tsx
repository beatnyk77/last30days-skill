"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Rocket, Target, Shield, Zap, Mail, MessageSquare, Globe, ArrowRight, ArrowLeft } from "lucide-react";
import { PlatformSelector } from "@/components/search/platform-selector";
import { cn } from "@/lib/utils";

const steps = [
    { id: "targeting", title: "Target Definition", icon: Target },
    { id: "strategy", title: "Strategic Profile", icon: Shield },
    { id: "actions", title: "Tactical Actions", icon: Zap },
    { id: "deploy", title: "Initialization", icon: Rocket },
];

export function PipelineBuilder() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        keyword: "",
        platforms: ["reddit", "x"],
        frequency: 24, // hours
        minStage: 3,
        notifications: {
            email: true,
            slack: false,
            webhook: false
        }
    });

    const next = () => setCurrentStep(Math.min(steps.length - 1, currentStep + 1));
    const prev = () => setCurrentStep(Math.max(0, currentStep - 1));

    return (
        <div className="max-w-4xl mx-auto space-y-10 py-12">
            {/* Step Progress */}
            <div className="grid grid-cols-4 gap-4">
                {steps.map((step, idx) => {
                    const Icon = step.icon;
                    const isActive = idx === currentStep;
                    const isPast = idx < currentStep;

                    return (
                        <div key={step.id} className="space-y-4">
                            <div className={cn(
                                "h-1 rounded-full transition-all duration-500",
                                isActive ? "bg-signal" : (isPast ? "bg-signal/40" : "bg-border")
                            )} />
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "h-8 w-8 rounded-sm border flex items-center justify-center transition-colors",
                                    isActive ? "border-signal bg-signal text-background" : "border-border bg-surface text-muted-foreground"
                                )}>
                                    <Icon className="h-4 w-4" />
                                </div>
                                <span className={cn(
                                    "font-mono text-[9px] uppercase tracking-[0.2em] hidden md:block",
                                    isActive ? "text-signal font-bold" : "text-muted-foreground"
                                )}>
                                    {step.title}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Card className="bg-surface border-border p-10 min-h-[500px] flex flex-col relative overflow-hidden rounded-sm">
                {/* Step 1: Targeting */}
                {currentStep === 0 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="space-y-2">
                            <h2 className="font-display text-4xl uppercase tracking-tight">Intelligence Parameters</h2>
                            <p className="font-ui text-text-secondary text-sm">Define the tactical scope of this automated pipeline.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">Pipeline Signature Name</Label>
                                <Input
                                    placeholder="e.g. Enterprise Search AI Tracker"
                                    className="bg-background border-border h-12 font-ui"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="space-y-3">
                                <Label className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">Strategic Keyword</Label>
                                <Input
                                    placeholder="Enter keyword for reconnaissance..."
                                    className="bg-background border-border h-12 font-ui placeholder:italic"
                                    value={formData.keyword}
                                    onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
                                />
                            </div>

                            <div className="space-y-3">
                                <Label className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">Target Streams</Label>
                                <PlatformSelector
                                    selected={formData.platforms}
                                    onChange={(platforms) => setFormData({ ...formData, platforms })}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Strategy */}
                {currentStep === 1 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="space-y-2">
                            <h2 className="font-display text-4xl uppercase tracking-tight">Strategic Filtering</h2>
                            <p className="font-ui text-text-secondary text-sm">Set the sensitivity and deployment frequency for automated scans.</p>
                        </div>

                        <div className="space-y-12">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <Label className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">Scan Frequency</Label>
                                    <span className="font-mono text-signal text-xs">Every {formData.frequency} Hours</span>
                                </div>
                                <Slider
                                    value={[formData.frequency]}
                                    max={72}
                                    min={1}
                                    step={1}
                                    onValueChange={([freq]) => setFormData({ ...formData, frequency: freq })}
                                />
                                <p className="font-ui text-[11px] text-muted-foreground italic">Rapid scans ( {`<`} 6h) consume more credits but provide higher recency.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <Label className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">Min. Intent Stage</Label>
                                    <span className="font-mono text-signal text-xs">Stage 0{formData.minStage}+ Only</span>
                                </div>
                                <Slider
                                    value={[formData.minStage]}
                                    max={5}
                                    min={1}
                                    step={1}
                                    onValueChange={([stage]) => setFormData({ ...formData, minStage: stage })}
                                />
                                <p className="font-ui text-[11px] text-muted-foreground italic">Only signals meeting this buyer stage threshold will trigger alerts.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Actions */}
                {currentStep === 2 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="space-y-2">
                            <h2 className="font-display text-4xl uppercase tracking-tight">Deployment Webhooks</h2>
                            <p className="font-ui text-text-secondary text-sm">Configure how intelligence is routed to your tactical stack.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex items-center justify-between p-6 border border-border bg-background/50 rounded-sm">
                                <div className="flex items-center gap-4">
                                    <Mail className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <h4 className="font-ui font-bold text-sm">Email Executive Brief</h4>
                                        <p className="font-ui text-[11px] text-muted-foreground">Receive PDF summaries directly.</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={formData.notifications.email}
                                    onCheckedChange={(val) => setFormData({ ...formData, notifications: { ...formData.notifications, email: val } })}
                                />
                            </div>

                            <div className="flex items-center justify-between p-6 border border-border bg-background/50 rounded-sm">
                                <div className="flex items-center gap-4">
                                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <h4 className="font-ui font-bold text-sm">Slack tactical-intel</h4>
                                        <p className="font-ui text-[11px] text-muted-foreground">Stream critical signals to channel.</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={formData.notifications.slack}
                                    onCheckedChange={(val) => setFormData({ ...formData, notifications: { ...formData.notifications, slack: val } })}
                                />
                            </div>

                            <div className="flex items-center justify-between p-6 border border-border bg-background/50 rounded-sm">
                                <div className="flex items-center gap-4">
                                    <Globe className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <h4 className="font-ui font-bold text-sm">JSON Webhook (PostHog/Zapier)</h4>
                                        <p className="font-ui text-[11px] text-muted-foreground">Trigger custom downstream workflows.</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={formData.notifications.webhook}
                                    onCheckedChange={(val) => setFormData({ ...formData, notifications: { ...formData.notifications, webhook: val } })}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Deploy */}
                {currentStep === 3 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center py-10">
                        <div className="mx-auto h-24 w-24 bg-signal/10 border border-signal/20 rounded-full flex items-center justify-center mb-6">
                            <Rocket className="h-10 w-10 text-signal" />
                        </div>
                        <div className="space-y-3">
                            <h2 className="font-display text-5xl uppercase tracking-tight">Ready for Deployment</h2>
                            <p className="font-ui text-text-secondary max-w-md mx-auto leading-relaxed">
                                Pipeline <span className="text-signal font-bold italic font-mono uppercase tracking-widest">{formData.name || "UNNAMED"}</span> will commence targeted reconnaissance every {formData.frequency} hours.
                            </p>
                        </div>

                        <div className="bg-background/50 border border-border p-6 rounded-sm max-w-sm mx-auto flex flex-col items-center gap-3">
                            <div className="flex items-center gap-2">
                                <Shield className="h-3 w-3 text-signal" />
                                <span className="font-mono text-[10px] uppercase tracking-widest">End-to-End Encryption Enabled</span>
                            </div>
                            <Button className="w-full bg-signal text-background hover:bg-signal/90 font-mono text-xs uppercase tracking-widest font-bold h-12">
                                Initialize Pipeline
                            </Button>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-auto pt-10 border-t border-border flex items-center justify-between">
                    <Button
                        variant="ghost"
                        onClick={prev}
                        disabled={currentStep === 0}
                        className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-signal"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>

                    {currentStep < steps.length - 1 && (
                        <Button
                            onClick={next}
                            className="bg-text-primary text-background hover:bg-signal hover:text-background font-mono text-[10px] uppercase tracking-widest transition-all"
                        >
                            Next Step
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    )}
                </div>
            </Card>
        </div>
    );
}
