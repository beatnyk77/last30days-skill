"use client";

import { authClient } from "@/lib/auth/client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, Settings } from "lucide-react";
import React from "react";

export function UserProfile() {
    const { data: session } = authClient.useSession();

    if (!session) return null;

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
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
                <div className="flex items-center gap-3 group">
                    <div className="flex flex-col items-end mr-1 text-right">
                        <span className="font-ui text-sm font-bold tracking-tight text-text-primary group-hover:text-signal transition-colors">{session.user.name}</span>
                        <span className="font-mono text-[10px] uppercase tracking-widest opacity-40">Operator</span>
                    </div>
                    <Avatar className="h-9 w-9 rounded-sm border border-border group-hover:border-signal transition-all">
                        <AvatarImage src={session.user.image || undefined} />
                        <AvatarFallback className="bg-surface text-text-primary rounded-none font-mono text-xs">
                            {session.user.name?.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-surface border-border p-2 rounded-sm shadow-2xl">
                <DropdownMenuLabel className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground px-2 py-3">Account Intelligence</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem className="focus:bg-signal/10 focus:text-signal cursor-pointer flex items-center gap-3 p-3">
                    <User className="h-4 w-4" />
                    <span className="font-ui text-[13px] uppercase tracking-wider">Profile Overview</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-signal/10 focus:text-signal cursor-pointer flex items-center gap-3 p-3">
                    <Settings className="h-4 w-4" />
                    <span className="font-ui text-[13px] uppercase tracking-wider">System Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="focus:bg-alert/10 focus:text-alert text-text-secondary cursor-pointer flex items-center gap-3 p-3"
                >
                    <LogOut className="h-4 w-4" />
                    <span className="font-ui text-[13px] uppercase tracking-wider font-bold">Terminate Session</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
