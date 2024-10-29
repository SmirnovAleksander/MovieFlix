export interface GenreUnique {
    id: number;
    genre: string;
}
export interface CountryUnique {
    id: number;
    country: string;
}
export interface GenresAndCountries {
    genres: GenreUnique[];
    countries: CountryUnique[];
}