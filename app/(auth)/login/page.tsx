"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Goal } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await authClient.signIn.email({
            email,
            password,
            callbackURL: "/dashboard",
        });
        setLoading(false);
    };

    const handleSocialLogin = async (provider: "google" | "github") => {
        await authClient.signIn.social({
            provider,
            callbackURL: "/dashboard",
        });
    };

    return (
        <div className="flex min-h-screen bg-background text-text-primary">
            {/* Left Side — Wordmark & Quote */}
            <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 border-r border-border bg-[#0A0A0B]">
                <div className="text-[13px] font-mono tracking-[0.3em] text-signal uppercase opacity-80">
                    IntentRadar
                </div>

                <div className="max-w-md">
                    <blockquote className="space-y-6">
                        <p className="font-display text-5xl leading-[0.95] tracking-tight">
                            "We're switching from Asana after 3 years. Budget approved. Need to decide by end of Q1."
                        </p>
                        <footer className="font-mono text-sm text-text-secondary">
                            — Signal found in r/projectmanagement (Stage 5 Intent)
                        </footer>
                    </blockquote>
                </div>

                <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                    Intelligent Reconnaissance — v2.9.5
                </div>
            </div>

            {/* Right Side — Login Form */}
            <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
                <Card className="w-full max-w-md border-0 bg-transparent shadow-none">
                    <CardHeader className="p-0 space-y-2 mb-8">
                        <div className="lg:hidden text-[13px] font-mono tracking-[0.3em] text-signal uppercase mb-8">
                            IntentRadar
                        </div>
                        <CardTitle className="font-display text-4xl tracking-tight">Log in</CardTitle>
                        <CardDescription className="text-text-secondary font-ui text-base">
                            Enter your credentials to access your intelligence reports.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                variant="outline"
                                className="font-ui border-border hover:border-signal hover:bg-transparent transition-colors h-11"
                                onClick={() => handleSocialLogin("google")}
                            >
                                <Goal className="mr-2 h-4 w-4" /> Google
                            </Button>
                            <Button
                                variant="outline"
                                className="font-ui border-border hover:border-signal hover:bg-transparent transition-colors h-11"
                                onClick={() => handleSocialLogin("github")}
                            >
                                <Github className="mr-2 h-4 w-4" /> GitHub
                            </Button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-widest">
                                <span className="bg-background px-4 text-muted-foreground">or continue with email</span>
                            </div>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Work Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    required
                                    className="bg-surface border-border focus-visible:ring-signal focus-visible:border-signal h-11 rounded-sm font-ui"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="password" className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Password</Label>
                                    <Link href="#" className="font-mono text-[10px] text-signal hover:underline uppercase tracking-wider">Forgot?</Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    className="bg-surface border-border focus-visible:ring-signal focus-visible:border-signal h-11 rounded-sm font-ui"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full bg-signal text-background hover:bg-signal/90 font-ui font-bold h-11 transition-all" disabled={loading}>
                                {loading ? "Authenticating..." : "Access Instance →"}
                            </Button>
                        </form>

                        <p className="text-center font-ui text-sm text-text-secondary">
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-signal hover:underline">Start scanning for free</Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
