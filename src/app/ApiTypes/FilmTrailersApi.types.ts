export interface TrailerItem {
    url: string;
    name: string;
    site: "YOUTUBE" | "UNKNOWN";
}

export interface TrailerData {
    total: number;
    items: TrailerItem[];
}