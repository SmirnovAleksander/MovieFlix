export interface ImageItem {
    imageUrl: string;
    previewUrl: string;
}

export interface FilmItemImages {
    total: number;
    totalPages: number;
    items: ImageItem[];
}