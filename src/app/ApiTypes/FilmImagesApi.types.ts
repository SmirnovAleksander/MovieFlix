export interface FilmImageItem  {
    imageUrl: string;
    previewUrl: string;
}

export interface FilmImagesCollection  {
    total: number;
    totalPages: number;
    items: FilmImageItem[];
}
export interface FilmImagesQueryParams {
    id: string;
    type: string;
    page: number;
}
