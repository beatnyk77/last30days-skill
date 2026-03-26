"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, MoreHorizontal } from "lucide-react";
import Link from "next/link";

const reports = [
    { id: "1", keyword: "Enterprise Search AI", date: "2025-03-24", stage: 4, signals: 42, status: "completed" },
    { id: "2", keyword: "Vector Database Market", date: "2025-03-22", stage: 3, signals: 128, status: "completed" },
    { id: "3", keyword: "RAG Sovereignty", date: "2025-03-21", stage: 5, signals: 18, status: "completed" },
    { id: "4", keyword: "AI Agent Frameworks", date: "2025-03-20", stage: 2, signals: 254, status: "completed" },
];

export function RecentReports() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] font-bold">Recent Intelligence</h3>
                <Button variant="ghost" size="sm" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-signal">View All Reports</Button>
            </div>

            <div className="bg-surface border border-border rounded-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-surface-lighter">
                        <TableRow className="border-border hover:bg-transparent">
                            <TableHead className="font-mono text-[9px] uppercase tracking-widest text-text-secondary h-10">Target Keyword</TableHead>
                            <TableHead className="font-mono text-[9px] uppercase tracking-widest text-text-secondary h-10">Intent Stage</TableHead>
                            <TableHead className="font-mono text-[9px] uppercase tracking-widest text-text-secondary h-10">Signals</TableHead>
                            <TableHead className="font-mono text-[9px] uppercase tracking-widest text-text-secondary h-10">Date</TableHead>
                            <TableHead className="text-right h-10"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reports.map((report) => (
                            <TableRow key={report.id} className="border-border hover:bg-surface-lighter transition-colors group">
                                <TableCell className="font-ui font-medium py-4">
                                    {report.keyword}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="font-mono text-[9px] rounded-none border-signal/20 text-signal">
                                        Stage 0{report.stage}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-mono text-[11px] text-text-secondary">
                                    {report.signals}
                                </TableCell>
                                <TableCell className="font-mono text-[11px] text-text-secondary">
                                    {report.date}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/reports/${report.id}`}>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-signal">
                                                <ExternalLink className="h-3.5 w-3.5" />
                                            </Button>
                                        </Link>
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground">
                                            <MoreHorizontal className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
