import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background text-text-primary selection:bg-signal selection:text-background">
            {/* Navigation */}
            <header className="h-20 border-b border-white/[0.03] fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-8">
                    <Link href="/" className="text-[14px] font-mono tracking-[0.4em] text-signal uppercase font-bold">
                        IntentRadar
                    </Link>

                    <nav className="hidden md:flex items-center gap-10">
                        <Link href="#features" className="font-mono text-[10px] uppercase tracking-widest text-text-secondary hover:text-signal transition-colors">Capabilities</Link>
                        <Link href="#pipeline" className="font-mono text-[10px] uppercase tracking-widest text-text-secondary hover:text-signal transition-colors">Pipeline</Link>
                        <Link href="#pricing" className="font-mono text-[10px] uppercase tracking-widest text-text-secondary hover:text-signal transition-colors">Pricing</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link href="/login">
                            <Button variant="ghost" className="font-mono text-[10px] uppercase tracking-widest hover:text-signal bg-transparent">Access Instance</Button>
                        </Link>
                        <Link href="/signup">
                            <Button className="bg-signal text-background hover:bg-signal/90 font-bold rounded-sm px-6 h-10 uppercase text-[10px] tracking-widest">Deploy Now →</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="pt-20">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-border mt-32 py-20 bg-surface/30">
                <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-6">
                        <div className="text-[13px] font-mono tracking-[0.3em] text-signal uppercase">
                            IntentRadar
                        </div>
                        <p className="font-ui text-sm text-text-secondary leading-relaxed">
                            Production-grade reconnaissance for high-growth teams. Reveal intent before they hit your landing page.
                        </p>
                    </div>
                    {/* Simple footer links */}
                    <div />
                    <div className="space-y-4">
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Resources</h4>
                        <ul className="space-y-2 font-ui text-[13px] text-text-secondary">
                            <li><Link href="#" className="hover:text-signal">Intelligence Guide</Link></li>
                            <li><Link href="#" className="hover:text-signal">API Documentation</Link></li>
                            <li><Link href="#" className="hover:text-signal">System Status</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Legal</h4>
                        <ul className="space-y-2 font-ui text-[13px] text-text-secondary">
                            <li><Link href="#" className="hover:text-signal">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-signal">Terms of Operation</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-8 mt-20 pt-8 border-t border-border/50 text-center">
                    <span className="font-mono text-[9px] uppercase tracking-widest opacity-30">© 2026 IntentRadar Intelligence Systems. ALL RIGHTS RESERVED.</span>
                </div>
            </footer>
        </div>
    );
}
