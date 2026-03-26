export interface Signal {
    id: string;
    source: "reddit" | "x" | "hn" | "youtube" | "tiktok" | "web";
    url: string;
    title: string;
    snippet: string;
    author: string;
    timestamp: string;
    relevance: number; // 0-1
    intentStage: number; // 1-5
    sentiment: "positive" | "neutral" | "negative";
    metrics: {
        upvotes?: number;
        comments?: number;
        views?: number;
        likes?: number;
    };
}

export interface PlatformStat {
    platform: string;
    count: number;
    avgRelevance: number;
    topTags: string[];
}

export interface ReportData {
    id: string;
    keyword: string;
    summary: string;
    buyerStage: number;
    timestamp: string;
    platforms: string[];
    signals: Signal[];
    platformStats: PlatformStat[];
}
