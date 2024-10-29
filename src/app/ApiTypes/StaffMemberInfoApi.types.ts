export interface PersonInfo {
    personId: number;
    webUrl: string;
    nameRu: string;
    nameEn: string;
    sex: 'MALE' | 'FEMALE';
    posterUrl: string;
    growth?: string;
    birthday?: string;
    death?: string;
    age?: number;
    birthplace?: string;
    deathplace?: string;
    hasAwards: number;
    profession: string;
    facts: string[];
    spouses?: Spouse[];
    films?: Film[];
}

export interface Spouse {
    personId: number;
    name: string;
    divorced: boolean;
    divorcedReason?: string;
    sex: 'MALE' | 'FEMALE';
    children?: number;
    webUrl: string;
    relation: string;
}

export interface Film {
    filmId: number;
    nameRu: string;
    nameEn?: string;
    rating: string;
    general: boolean;
    description?: string;
    professionKey: 'ACTOR' | 'DIRECTOR' | 'PRODUCER' | 'WRITER' | string;
}

export type PersonsInfo = PersonInfo[];
