export interface SequelAndPrequel {
    filmId: number;
    nameRu: string;
    nameEn: string;
    nameOriginal: string;
    posterUrl: string;
    posterUrlPreview: string;
    relationType: 'PREQUEL' | 'SEQUEL' | string;
    kinopoiskId: number;
}
export type SequelsAndPrequels = SequelAndPrequel[];