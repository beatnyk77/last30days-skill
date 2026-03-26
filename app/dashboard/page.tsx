import React from "react";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { SearchCommand } from "@/components/search/search-command";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentReports } from "@/components/dashboard/recent-reports";
import { ActivePipelines } from "@/components/dashboard/active-pipelines";

export default function DashboardPage() {
    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <DashboardHeader
                heading="Command Center"
                text="Real-time intent reconnaissance and multi-stream intelligence."
            />

            {/* Primary Action: Engine Search */}
            <section className="reveal-item">
                <SearchCommand />
            </section>

            {/* Intelligence Metrics */}
            <section className="reveal-item" style={{ animationDelay: "0.2s" }}>
                <StatsCards />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Activity Feed */}
                <div className="lg:col-span-2 space-y-6 reveal-item" style={{ animationDelay: "0.4s" }}>
                    <RecentReports />
                </div>

                {/* Side Panels: Pipelines & Status */}
                <div className="space-y-10 reveal-item" style={{ animationDelay: "0.6s" }}>
                    <ActivePipelines />
                </div>
            </div>
        </div>
    );
}
