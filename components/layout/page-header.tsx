import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
    title: string;
    description?: string;
    actions?: React.ReactNode;
    className?: string;
}

export function PageHeader({ title, description, actions, className }: PageHeaderProps) {
    return (
        <div className={cn("flex flex-col gap-6 mb-12 relative", className)}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-1 w-1 rounded-full bg-signal shadow-[0_0_8px_rgba(232,255,1).5]" />
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Intelligence Module</span>
                    </div>
                    <h2 className="font-display text-5xl tracking-tight leading-[0.9]">{title}</h2>
                    {description && (
                        <p className="font-ui text-text-secondary text-lg max-w-2xl mt-4">
                            {description}
                        </p>
                    )}
                </div>
                {actions && (
                    <div className="flex items-center gap-3">
                        {actions}
                    </div>
                )}
            </div>
            <div className="w-full h-px bg-gradient-to-r from-border via-border to-transparent" />
        </div>
    );
}
