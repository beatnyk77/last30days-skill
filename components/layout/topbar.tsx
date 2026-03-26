import React from "react";
import { UserProfile } from "./user-profile";

export function Topbar({ title }: { title?: string }) {
    return (
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 flex items-center justify-between px-8 z-40">
            <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Path //</span>
                <h1 className="font-display text-xl tracking-tight uppercase">{title || "Dashboard"}</h1>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden md:flex flex-col items-end mr-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-signal">System Normal</span>
                    <span className="font-mono text-[8px] uppercase tracking-tighter opacity-40 italic">v2.9.5-PROD</span>
                </div>
                <UserProfile />
            </div>
        </header>
    );
}
