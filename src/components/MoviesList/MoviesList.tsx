import {Pagination, Stack} from "@mui/material";
import MovieCard from "../MovieCard";
import {FilmItem} from "../../app/ApiTypes/FilmItemApi.types.ts";
import {FilmItemCollection} from "../../app/ApiTypes/FilmCollectionApi.types.ts";

interface MoviesListProps {
    movies: FilmItemCollection[] | FilmItem[],
    totalPages: number,
    page: number,
    setPage: (page: number) => void
}

const MoviesList: React.FC<MoviesListProps> = ({movies, page, setPage, totalPages}) => {
    return (
        <>
            <Stack
                direction='row'
                justifyContent='center'
                flexWrap='wrap'
                // spacing={2}
            >
                {movies.map((movie) => (
                    <MovieCard key={movie.kinopoiskId} movie={movie}/>
                ))}
            </Stack>
            <Stack alignItems={'center'} py={2}>
                <Pagination
                    count={totalPages}
                    variant="outlined"
                    color="primary"
                    page={page}
                    onChange={(_, newPage) => setPage(newPage)}
                />
            </Stack>
        </>
    );
};

export default MoviesList;