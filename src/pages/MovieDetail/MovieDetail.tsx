import {
    useGetFilmImagesQuery,
    useGetFilmInfoQuery, useGetFilmTrailerQuery,
    useGetSequelsAndPrequelsQuery,
    useGetStuffQuery
} from "../../services/kinopoiskApi.ts";
import {useNavigate, useParams} from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingElement from "../../components/LoadingElement";
import {Box, Button, ButtonGroup, IconButton, Stack, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {ArrowBack, Language, Movie as MovieIcon} from "@mui/icons-material";
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import MovieCard from "../../components/MovieCard";
import VideoPlayer from "../../components/VideoPlayer";
import ImageCarousel from "../../components/ImageCarousel";
import TrailerPlayer from "../../components/TrailerPlayer";
import {useContext, useRef} from "react";
import {ColorModeContext} from "../../components/context/ToggleColorMod.tsx";
import ActorMiniCard from "../../components/ActorMiniCard";

const MovieDetail = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const trailerRef = useRef<HTMLDivElement>(null)
    const scrollToTrailer = () => {
        trailerRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const responseFilmInfo = useGetFilmInfoQuery({id: id!});
    const responseSequelsAndPrequels = useGetSequelsAndPrequelsQuery({id: id!});
    const responseFilmStuff = useGetStuffQuery({id: id!});
    const responseFilmTrailers = useGetFilmTrailerQuery({id: id!})
    const stillImages = useGetFilmImagesQuery({ id: id!, page: 1, type: 'STILL' });
    const shootingImages = useGetFilmImagesQuery({ id: id!, page: 1, type: 'SHOOTING' });
    const posterImages = useGetFilmImagesQuery({ id: id!, page: 1, type: 'POSTER' });
    console.log(responseFilmInfo.data)
    console.log(responseFilmStuff.data)
    const directorStuff = responseFilmStuff.data?.filter(el => el.professionKey === 'DIRECTOR')
    const actorsStuff = responseFilmStuff.data?.filter(el => el.professionKey === 'ACTOR')
    const toggleColor = useContext(ColorModeContext);
    const gradientColor = toggleColor?.mode === 'dark'
        ? 'linear-gradient(to top, rgba(18, 18, 18, 1), rgba(18, 18, 18, 0))'
        : 'linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))';
    if (responseFilmInfo.error &&
        responseSequelsAndPrequels.error &&
        responseFilmStuff.error &&
        stillImages.error &&
        shootingImages.error &&
        posterImages.error &&
        responseFilmTrailers.error
    ) return <ErrorMessage/>;
    if (responseFilmInfo.isLoading ||
        responseSequelsAndPrequels.isLoading ||
        responseFilmStuff.isLoading ||
        stillImages.isLoading ||
        shootingImages.isLoading ||
        posterImages.isLoading ||
        responseFilmTrailers.isLoading
    ) return <LoadingElement/>;
    const imageTypes: Record<string, string> = {
        'STILL': "Кадры из фильма",
        'SHOOTING': "Изображения со съемок",
        'POSTER': "Постеры",
    }
    return (
        <Stack py={2}>
            <Grid container spacing={2}>
                <Grid size={4} sx={{sm: 12}}>
                    <img
                        loading="lazy"
                        src={responseFilmInfo.data?.posterUrl}
                        alt={responseFilmInfo.data?.nameRu}
                        width="100%"
                    />
                    {/*<Box sx={{position: 'relative'}}>*/}
                    {/*    <img*/}
                    {/*        src={responseFilmInfo.data?.posterUrl}*/}
                    {/*        alt={responseFilmInfo.data?.nameRu}*/}
                    {/*        width="100%"*/}
                    {/*    />*/}
                    {/*    <Button onClick={scrollToTrailer}*/}
                    {/*            sx={{position: 'absolute', bottom: '10px', right: '5px'}}>Трейлер</Button>*/}
                    {/*</Box>*/}
                    {/*{posterImages.data && (*/}
                    {/*    <PosterCarousel images={posterImages.data.items}/>*/}
                    {/*)}*/}
                    <Grid container spacing={2}>
                        <Grid size={12} >
                            <ButtonGroup variant="outlined" size='small'>
                                <Button target='_blank' endIcon={<Language/>} href={responseFilmInfo.data?.webUrl || ""}>Кинопоиск</Button>
                                <Button target='_blank' endIcon={<MovieIcon/>} href={`https://www.imdb.com/title/${responseFilmInfo.data?.imdbId} || ""`}>IMDB</Button>
                                <Button onClick={scrollToTrailer} endIcon={<MovieCreationOutlinedIcon/>}>Трейлер</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid size={5.5} sx={{sm: 12}}>
                    <Grid container alignItems="center">
                        <Grid size={1}>
                            <IconButton onClick={() => navigate(-1)}>
                                <ArrowBack/>
                            </IconButton>
                        </Grid>
                        <Grid>
                            <Typography variant="h6">
                                {responseFilmInfo.data?.nameRu ? responseFilmInfo.data?.nameRu : responseFilmInfo.data?.nameEn}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} paddingTop={1}>
                        <Grid size={6}>Год</Grid>
                        <Grid size={6}>
                            <Typography variant="body2" >
                                {responseFilmInfo.data?.year}
                            </Typography>
                        </Grid>

                        <Grid size={6}>Страна</Grid>
                        <Grid size={6}>
                            {responseFilmInfo.data?.countries?.map(({ country }) => (
                                <Typography key={country} variant="body2">
                                    {country}
                                </Typography>
                            )) || null}
                        </Grid>

                        <Grid size={6}>Жанры</Grid>
                        <Grid size={6}>
                            {responseFilmInfo.data?.genres?.map(({ genre }) => (
                                <Typography key={genre} variant="body2">
                                    {genre}
                                </Typography>
                            )) || null}
                        </Grid>

                        <Grid size={6}>Режиссеры</Grid>
                        <Grid size={6}>
                            {directorStuff?.slice(0, 5).map(({ nameRu, staffId }) => (
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
                <Grid size={2.5} container direction="column" sx={{sm: 12}}>
                    <Grid size={12} textAlign='center'>Актерский состав</Grid>
                    {actorsStuff && actorsStuff.length > 0 ? ( // Проверяем, что actorsStuff не пустой
                        <Grid size={12} sx={{ overflow: 'hidden', height: '550px', position: 'relative' }}>
                            <Stack
                                direction='column'
                                spacing={1}
                                sx={{
                                    maxHeight: '100%',
                                    overflowY: 'auto',
                                    scrollSnapType: 'y mandatory',
                                    scrollbarWidth: 'none'
                                }}
                            >
                                <ActorMiniCard actorsStuff={actorsStuff} />
                            </Stack>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '100px',
                                    background: gradientColor,
                                    pointerEvents: 'none',
                                }}
                            />
                        </Grid>
                    ) : (
                        <Grid size={12} textAlign='center' sx={{ marginTop: '20px' }}>
                            <Typography variant="body1">Актерский состав отсутствует</Typography>
                        </Grid>
                    )}
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
            {stillImages.data && (
                <ImageCarousel title={imageTypes['STILL']} images={stillImages.data.items} />
            )}
            {shootingImages.data && (
                <ImageCarousel title={imageTypes["SHOOTING"]} images={shootingImages.data.items} />
            )}
            {posterImages.data && (
                <ImageCarousel title={imageTypes["POSTER"]} images={posterImages.data.items} />
            )}
            {responseFilmTrailers.data && responseFilmTrailers.data.items.length > 0 && (
                <Stack alignItems='center' justifyContent='center' py={2}>
                    <div ref={trailerRef}>
                        <TrailerPlayer videoUrl={responseFilmTrailers.data.items[0].url}/>
                    </div>
                </Stack>
            )}
        </Stack>
);
};

export default MovieDetail;