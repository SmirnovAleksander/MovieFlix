import {Link} from "react-router-dom";
import {Box, Rating, Stack, Tooltip, Typography} from "@mui/material";
import {Movie} from "../MoviesList/MoviesList.tsx";

interface MovieCardProps {
    movie: Movie
}

const MovieCard: React.FC<MovieCardProps> = ({movie}) => {
    return (
        <Stack key={movie.kinopoiskId}>
            <Link to={`/movie/${movie.kinopoiskId}`}>
                <img style={{width: 215}} src={movie.posterUrlPreview} alt={movie.nameRu || movie.nameEn || "Movie Poster"} />
            </Link>
            <Typography textAlign='center'>{movie.nameRu ? movie.nameRu : movie.nameEn}</Typography>
            {movie.ratingKinopoisk && (
                <Stack alignItems={'center'}>
                    <Tooltip title={`${movie.ratingKinopoisk} / 10`} >
                        <Box>
                            <Rating
                                name='read-only'
                                value={movie.ratingKinopoisk / 2}
                                precision={0.1}
                                readOnly
                            />
                        </Box>
                    </Tooltip>
                </Stack>
            )}
        </Stack>
    );
};

export default MovieCard;