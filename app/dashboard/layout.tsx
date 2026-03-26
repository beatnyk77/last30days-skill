"use client";

import React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background text-text-primary">
            <Sidebar />
            <div className="pl-64 flex flex-col min-h-screen">
                <Topbar />
                <main className="flex-1 p-8 reveal-item">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>

                {/* Decorative Grid Overlay (Subtle) */}
                <div className="fixed inset-0 pointer-events-none opacity-[0.03]"
                    style={{ backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
            </div>
        </div>
    );
}
