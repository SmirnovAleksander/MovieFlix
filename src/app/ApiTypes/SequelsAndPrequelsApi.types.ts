export interface SequelAndPrequel {
    filmId: number | null;
    nameRu: string | null;
    nameEn: string | null;
    nameOriginal: string | null;
    posterUrl: string;
    posterUrlPreview: string;
    relationType: 'PREQUEL' | 'SEQUEL' | string;
    kinopoiskId: number;
}
export type SequelsAndPrequels = SequelAndPrequel[];