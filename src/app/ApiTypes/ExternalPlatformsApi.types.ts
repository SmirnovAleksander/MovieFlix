export interface StreamingPlatformItem {
    url: string;
    platform: string;
    logoUrl: string;
}

export interface StreamingPlatforms {
    total: number;
    items: StreamingPlatformItem[];
}