import {useGetFilmInfoQuery} from "../../services/kinopoiskApi.ts";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import {Box, Stack, Typography} from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";
import {Link} from "react-router-dom";

interface MiniMovieCardProps {
    filmId: number;
}

const MiniMovieCard: React.FC<MiniMovieCardProps> = ({filmId}) => {
    const { data, isLoading, error } = useGetFilmInfoQuery({ id: filmId.toString()});
    const cardHeight = 220;

    if (isLoading) return <Typography>Загрузка...</Typography>;
    if (error || !data) return null;
    const movieTitle = data.nameRu || data.nameEn;
    if (!movieTitle) return null;

    return (
        <Stack key={data.kinopoiskId} m={0.5} direction={'row'}>
            <Card sx={{ width: 150, height: '290px'}}>
                <CardActionArea>
                    <Link to={`/movie/${data.kinopoiskId}`}>
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
                                src={data.posterUrlPreview}
                                alt={data.nameRu || data.nameEn || "Movie Poster"}
                                sx={{
                                    height: '100%',
                                    width: 'auto',
                                    objectFit: 'contain'
                                }}
                            />
                        </Box>
                    </Link>
                    <CardContent sx={{padding: '10px 5px', height: '90px'}} >
                        <Typography textAlign='center' variant={"body2"}>{data.nameRu ? data.nameRu : data.nameEn}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Stack>
    );
};

export default MiniMovieCard;