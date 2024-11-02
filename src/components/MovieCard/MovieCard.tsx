import {Link} from "react-router-dom";
import {Box, Rating, Stack, Tooltip, Typography} from "@mui/material";
import {FilmItemCollection} from "../../app/ApiTypes/FilmCollectionApi.types.ts";
import {FilmItem} from "../../app/ApiTypes/FilmItemApi.types.ts";
import {SequelAndPrequel} from "../../app/ApiTypes/SequelsAndPrequelsApi.types.ts";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import {SimilarFilmItem} from "../../app/ApiTypes/SimilarFilmsApi.types.ts";

interface MovieCardProps {
    movie: FilmItemCollection | FilmItem | SequelAndPrequel | SimilarFilmItem;
}

const MovieCard: React.FC<MovieCardProps> = ({movie}) => {
    const hasRating = 'ratingKinopoisk' in movie && movie.ratingKinopoisk !== null;
    const cardHeight = 320;
    const filmId = 'kinopoiskId' in movie ? movie.kinopoiskId : movie.filmId
    return (
        <Stack key={filmId} m={0.5}>
            <Card sx={{ width: 215}} >
                <CardActionArea>
                    <Link to={`/movie/${filmId}`}>
                        <Box sx={{
                            height: cardHeight,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'black'
                        }}>
                            <CardMedia
                                component="img"
                                loading="lazy"
                                src={movie.posterUrlPreview}
                                alt={movie.nameRu || movie.nameEn || "Movie Poster"}
                                sx={{
                                    height: '100%',
                                    width: 'auto',
                                    objectFit: 'contain'
                                }}
                            />
                        </Box>
                    </Link>
                    <CardContent sx={{padding: '10px 5px', height: '90px'}} >
                        <Typography textAlign='center'>{movie.nameRu ? movie.nameRu : movie.nameEn}</Typography>
                        {hasRating && (
                            <Stack alignItems={'center'}>
                                <Tooltip title={`${movie.ratingKinopoisk} / 10`} >
                                    <Box>
                                        <Rating
                                            name='read-only'
                                            value={movie.ratingKinopoisk! / 2}
                                            precision={0.1}
                                            readOnly
                                        />
                                    </Box>
                                </Tooltip>
                            </Stack>
                        )}
                    </CardContent>
                </CardActionArea>
            </Card>
        </Stack>
    );
};

export default MovieCard;