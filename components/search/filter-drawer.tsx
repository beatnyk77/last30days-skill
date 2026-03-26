"use client";

import React from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function FilterDrawer() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 border-border bg-surface hover:bg-surface/80 hover:border-signal/50 text-[10px] uppercase tracking-widest font-mono group">
                    <SlidersHorizontal className="mr-2 h-3.5 w-3.5 opacity-50 group-hover:opacity-100 group-hover:text-signal transition-all" />
                    Tactical Filters
                </Button>
            </SheetTrigger>
            <SheetContent className="bg-surface border-l border-border sm:max-w-md">
                <SheetHeader className="space-y-4 mb-10">
                    <div className="h-1 w-12 bg-signal mb-2" />
                    <SheetTitle className="font-display text-4xl uppercase tracking-tighter">Tactical Filters</SheetTitle>
                    <SheetDescription className="font-ui text-text-secondary text-base">
                        Refine your intelligence reconnaissance parameters.
                    </SheetDescription>
                </SheetHeader>

                <div className="space-y-12">
                    {/* Filter Group: Date Range */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h4 className="font-mono text-[11px] uppercase tracking-widest text-text-primary">Window of Recon</h4>
                            <span className="font-mono text-[10px] text-signal uppercase tracking-widest">30 Days</span>
                        </div>
                        <div className="h-px bg-border w-full" />
                        <p className="font-ui text-xs text-text-secondary italic">Standard operation set to last 30 days for maximum fidelity.</p>
                    </div>

                    {/* Filter Group: Intent Depth */}
                    <div className="space-y-6">
                        <h4 className="font-mono text-[11px] uppercase tracking-widest text-text-primary">Minimum Intent Depth</h4>
                        <div className="grid grid-cols-5 gap-2">
                            {[1, 2, 3, 4, 5].map((level) => (
                                <button key={level} className="h-10 border border-border flex items-center justify-center font-mono text-xs hover:border-signal transition-colors group">
                                    {level}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground mt-2">
                            <Info className="h-3 w-3" />
                            <span className="text-[10px] font-ui italic">Higher levels indicate stronger buying signals.</span>
                        </div>
                    </div>

                    {/* Filter Group: Boolean Options */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="ignore-bots" className="font-ui text-sm text-text-primary">Strict Bot Filtering</Label>
                            <Switch id="ignore-bots" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="parse-sentiment" className="font-ui text-sm text-text-primary">AI Sentiment Analysis</Label>
                            <Switch id="parse-sentiment" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="geo-targeting" className="font-ui text-sm text-text-primary">Geo-location Extraction</Label>
                            <Switch id="geo-targeting" />
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-8 right-8 space-y-4">
                    <Button className="w-full bg-signal text-background hover:bg-signal/90 font-bold uppercase tracking-widest h-12 rounded-sm">
                        Apply Parameters
                    </Button>
                    <Button variant="ghost" className="w-full text-muted-foreground hover:text-text-primary border-0 bg-transparent uppercase tracking-widest text-[10px] font-mono">
                        Reset to Default
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
