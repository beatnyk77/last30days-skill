import React from "react";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { PipelineBuilder } from "@/components/pipelines/builder-wizard";

export default function NewPipelinePage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <DashboardHeader
                heading="Mission Initialization"
                text="Deploy a new automated reconnaissance pipeline."
            />

            <div className="reveal-item">
                <PipelineBuilder />
            </div>
        </div>
    );
}
