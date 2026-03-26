import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Search,
    FileText,
    Zap,
    Settings,
    LogOut,
    ChevronRight,
    TrendingUp
} from "lucide-react";
import { authClient } from "@/lib/auth/client";

const navItems = [
    { name: "Intelligence Search", href: "/dashboard", icon: Search },
    { name: "Recent Reports", href: "/dashboard/reports", icon: FileText },
    { name: "Pipelines", href: "/dashboard/pipelines", icon: Zap },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    window.location.href = "/login";
                },
            },
        });
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-[#0A0A0B] flex flex-col z-50">
            {/* Brand */}
            <div className="p-8">
                <Link href="/dashboard" className="text-[13px] font-mono tracking-[0.3em] text-signal uppercase opacity-90 hover:opacity-100 transition-opacity">
                    IntentRadar
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 text-[13px] font-ui transition-all group",
                                isActive
                                    ? "text-signal bg-signal/5 border-l-2 border-signal -ml-[1px]"
                                    : "text-text-secondary hover:text-text-primary hover:bg-surface"
                            )}
                        >
                            <item.icon className={cn("h-4 w-4", isActive ? "text-signal" : "opacity-50")} />
                            <span className="flex-1 uppercase tracking-wider">{item.name}</span>
                            {isActive && <ChevronRight className="h-3 w-3 text-signal" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Usage Indicator */}
            <div className="mx-6 mb-8 p-4 border border-border bg-surface/50 rounded-sm">
                <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase text-text-secondary tracking-widest">Usage Instance</span>
                    <TrendingUp className="h-3 w-3 text-signal opacity-50" />
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        <span className="font-display text-2xl leading-none">3 / 10</span>
                        <span className="font-mono text-[9px] uppercase tracking-wider opacity-60">Credits</span>
                    </div>
                    <div className="w-full bg-border h-[2px]">
                        <div className="bg-signal h-full w-[30%]" />
                    </div>
                    <p className="font-ui text-[10px] text-text-secondary/70 leading-relaxed italic">
                        Resets in 12 days.
                    </p>
                </div>
            </div>

            {/* User Section */}
            <div className="p-4 border-t border-border mt-auto">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-[12px] font-ui text-text-secondary hover:text-alert transition-colors uppercase tracking-widest group"
                >
                    <LogOut className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                    <span>Terminate Session</span>
                </button>
            </div>
        </aside>
    );
}
