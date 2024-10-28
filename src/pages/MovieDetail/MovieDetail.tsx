import {useGetFilmInfoQuery, useGetSequelsAndPrequelsQuery, useGetStuffQuery} from "../../services/kinopoiskApi.ts";
import {useNavigate, useParams} from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingElement from "../../components/LoadingElement";
import {Button, ButtonGroup, Stack, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {ArrowBack, Language, Movie as MovieIcon} from "@mui/icons-material";
import MovieCard from "../../components/MovieCard";
import VideoPlayer from "../../components/VideoPlayer";

const MovieDetail = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const responseFilmInfo = useGetFilmInfoQuery({id: id!});
    const responseSequelsAndPrequels = useGetSequelsAndPrequelsQuery({id: id!});
    const responseFilmStuff = useGetStuffQuery({id: id!});

    const directorStuff = responseFilmStuff.data?.filter(el => el.professionKey === 'DIRECTOR')
    const actorsStuff = responseFilmStuff.data?.filter(el => el.professionKey === 'ACTOR')

    if (responseFilmInfo.error && responseSequelsAndPrequels.error && responseFilmStuff.error) return <ErrorMessage/>;
    if (responseFilmInfo.isLoading || responseSequelsAndPrequels.isLoading || responseFilmStuff.isLoading) return <LoadingElement/>;
    return (
        <Stack py={2}>
            <Grid container spacing={2}>
                <Grid size={4} sx={{sm: 12}}>
                    <img
                        src={responseFilmInfo.data?.posterUrl}
                        alt={responseFilmInfo.data?.nameRu}
                        width="100%"
                    />
                    <Grid container spacing={2}>
                        <Grid size={12} >
                            <ButtonGroup variant="outlined" size='small'>
                                <Button target='_blank' endIcon={<Language/>} href={responseFilmInfo.data?.webUrl || ""}>Кинопоиск</Button>
                                <Button target='_blank' endIcon={<MovieIcon/>} href={`https://www.imdb.com/title/${responseFilmInfo.data?.imdbId} || ""`}>IMDB</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid size={6} sx={{sm: 12}}>
                    <Grid container>
                        <Grid size={2}>
                            <Button startIcon={<ArrowBack/>} onClick={() => navigate(-1)}/>
                        </Grid>
                        <Grid size={4} alignItems="center" justifyContent="center">
                            <Typography variant="h6">
                                {responseFilmInfo.data?.nameRu ? responseFilmInfo.data?.nameRu : responseFilmInfo.data?.nameEn}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid size={6}>Год</Grid>
                        <Grid size={6}>
                            <Typography variant="body2" >
                                {responseFilmInfo.data?.year}
                            </Typography>
                        </Grid>

                        <Grid size={6}>Страна</Grid>
                        <Grid size={6}>
                            {responseFilmInfo.data?.countries.map(({ country }) => (
                                <Typography key={country} variant="body2">
                                    {country}
                                </Typography>
                            ))}
                        </Grid>

                        <Grid size={6}>Жанры</Grid>
                        <Grid size={6}>
                            {responseFilmInfo.data?.genres.map(({ genre }) => (
                                <Typography key={genre} variant="body2">
                                    {genre}
                                </Typography>
                            ))}
                        </Grid>

                        <Grid size={6}>Режиссеры</Grid>
                        <Grid size={6}>
                            {directorStuff?.map(({ nameRu, staffId }) => (
                                <Typography key={staffId} variant="body2">
                                    {nameRu}
                                </Typography>
                            ))}
                        </Grid>

                        <Grid size={6}>Продолжительность фильма</Grid>
                        <Grid size={6}>
                            <Typography variant="body2" >
                                {responseFilmInfo.data?.filmLength} мин
                            </Typography>
                        </Grid>

                        <Grid size={6}>Рейтинг Кинопоиска</Grid>
                        <Grid size={6}>
                            <Typography variant="body2" >
                                {responseFilmInfo.data?.ratingKinopoisk}
                            </Typography>
                        </Grid>

                        <Grid size={6}>Рейтинг Imb</Grid>
                        <Grid size={6}>
                            <Typography variant="body2" >
                                {responseFilmInfo.data?.ratingImdb}
                            </Typography>
                        </Grid>

                        {responseFilmInfo.data?.description ? (
                            <>
                                <Grid size={12}>Описание:</Grid>
                                <Grid size={12}>
                                    <Typography variant="body2" >
                                        {responseFilmInfo.data?.description}
                                    </Typography>
                                </Grid>
                            </>
                        ) : <Typography variant="body2">Описание отсутствует(api)</Typography>}

                    </Grid>
                </Grid>
                <Grid size={2} container direction="column" sx={{sm: 12}}>
                    <Grid size={12} textAlign='center'>Актерский состав</Grid>
                    <Grid size={12}>
                        {actorsStuff?.slice(0, 20).map(({ nameRu, staffId}) => (
                            <Typography key={staffId} variant="body2">
                                {nameRu}
                            </Typography>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <Stack spacing={1} alignItems="center" justifyContent='center' color='primary'>
                <Typography variant='h6'>Смотреть онлайн</Typography>
                <VideoPlayer/>
            </Stack>
            {responseSequelsAndPrequels.data && (
                <Stack alignItems="center" justifyContent='center'>
                    <Typography variant='h6' py={2}>Сиквелы и приквелы</Typography>
                    <Stack direction='row' flexWrap='wrap' alignItems="center" justifyContent='center'>
                        {responseSequelsAndPrequels.data?.map((el) => (
                            <MovieCard movie={el} key={el.filmId} />
                        ))}
                    </Stack>
                </Stack>
            )}
        </Stack>
    );
};

export default MovieDetail;