"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
            <div className="h-20 w-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center">
                <AlertCircle className="h-10 w-10 text-red-500" />
            </div>

            <div className="text-center space-y-3">
                <h2 className="font-display text-4xl uppercase tracking-tight text-white line-clamp-1">Stream Disruption</h2>
                <p className="font-ui text-text-secondary max-w-md mx-auto">
                    Tactical communication with the research engine was interrupted.
                    <br />
                    <span className="font-mono text-[10px] text-red-400 mt-2 block uppercase">{error.message || "Unknown tactical error"}</span>
                </p>
            </div>

            <div className="flex items-center gap-4">
                <Button
                    onClick={() => reset()}
                    className="bg-signal text-background hover:bg-signal/90 font-mono text-[10px] uppercase tracking-widest font-bold h-12 px-8"
                >
                    <RotateCcw className="h-3.5 w-3.5 mr-2" />
                    Re-Initialize
                </Button>

                <Link href="/dashboard">
                    <Button variant="outline" className="border-border font-mono text-[10px] uppercase tracking-widest h-12 px-8">
                        <Home className="h-3.5 w-3.5 mr-2" />
                        Return Base
                    </Button>
                </Link>
            </div>
        </div>
    );
}
