"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ReportExportBar() {
    return (
        <div className="fixed bottom-0 left-0 right-0 h-20 bg-background/80 backdrop-blur-xl border-t border-border z-50 flex items-center justify-center px-6">
            <div className="max-w-7xl w-full flex items-center justify-between">
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="sm" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-signal">
                            <ArrowLeft className="h-3 w-3 mr-2" />
                            Back to Terminal
                        </Button>
                    </Link>
                    <div className="h-4 w-px bg-border" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        Intent: <span className="text-signal font-bold">Confidential</span>
                    </span>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button variant="outline" size="sm" className="flex-1 md:flex-none font-mono text-[10px] uppercase tracking-widest border-border hover:bg-surface-lighter transition-colors">
                        <Share2 className="h-3.5 w-3.5 mr-2" />
                        Share
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 md:flex-none font-mono text-[10px] uppercase tracking-widest border-border hover:bg-surface-lighter transition-colors">
                        <Download className="h-3.5 w-3.5 mr-2" />
                        Export PDF
                    </Button>
                    <Button size="sm" className="flex-1 md:flex-none bg-signal text-background hover:bg-signal/90 font-mono text-[10px] uppercase tracking-widest font-bold">
                        <Plus className="h-3.5 w-3.5 mr-2" />
                        Automate Scan
                    </Button>
                </div>
            </div>
        </div>
    );
}
