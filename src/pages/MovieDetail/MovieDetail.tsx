import {
    useGetFilmImagesQuery,
    useGetFilmInfoQuery, useGetFilmTrailerQuery,
    useGetSequelsAndPrequelsQuery,
    useGetStuffQuery, useLazyGetFilmReviewsQuery,
    useGetExternalPlatformsQuery,
    useGetSimilarFilmsQuery
} from "../../services/kinopoiskApi.ts";
import {useNavigate, useParams} from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingElement from "../../components/LoadingElement";
import {Box, Button, ButtonGroup, IconButton, LinearProgress, Stack, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {ArrowBack, Language, Movie as MovieIcon} from "@mui/icons-material";
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import MovieCard from "../../components/MovieCard";
import ImageCarousel from "../../components/ImageCarousel";
import TrailerPlayer from "../../components/TrailerPlayer";
import {useContext, useEffect, useRef, useState} from "react";
import {ColorModeContext} from "../../components/context/ToggleColorMod.tsx";
import ActorMiniCard from "../../components/ActorMiniCard";
import VideoPlayer from "../../components/VideoPlayer";

const MovieDetail = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const trailerRef = useRef<HTMLDivElement>(null)
    const reviewRef = useRef<HTMLDivElement>(null)
    const scrollToTrailer = () => {
        trailerRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const scrollToReviews = () => {
        reviewRef.current?.scrollIntoView({behavior: 'smooth'});
    }
    const [isLoad, setIsLoad] = useState(false)
    const responseFilmInfo = useGetFilmInfoQuery({id: id!});
    const responseSequelsAndPrequels = useGetSequelsAndPrequelsQuery({id: id!});
    const responseFilmStuff = useGetStuffQuery({id: id!});
    const responseFilmTrailers = useGetFilmTrailerQuery({id: id!})
    const [triggerGetReviews, responseFilmReviews] = useLazyGetFilmReviewsQuery()
    const responseExternalPlatforms = useGetExternalPlatformsQuery({id: id!, page: 1})
    const responseSimilarFilms = useGetSimilarFilmsQuery({id: id!})

    useEffect(() => {
        const timer = setTimeout(() => {
            triggerGetReviews({ id: id!, page: 1, order: 'DATE_DESC' });
            setIsLoad(true)
        }, 4000);

        return () => clearTimeout(timer);
    }, [id, triggerGetReviews]);
    const stillImages = useGetFilmImagesQuery({ id: id!, page: 1, type: 'STILL' });
    const shootingImages = useGetFilmImagesQuery({ id: id!, page: 1, type: 'SHOOTING' });
    const posterImages = useGetFilmImagesQuery({ id: id!, page: 1, type: 'POSTER' });

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
        responseFilmTrailers.error &&
        responseFilmReviews.error &&
        responseExternalPlatforms.error &&
        responseSimilarFilms.error
    ) return <ErrorMessage/>;
    if (responseFilmInfo.isLoading ||
        responseSequelsAndPrequels.isLoading ||
        responseFilmStuff.isLoading ||
        stillImages.isLoading ||
        shootingImages.isLoading ||
        posterImages.isLoading ||
        responseFilmTrailers.isLoading ||
        responseExternalPlatforms.isLoading ||
        responseSimilarFilms.isLoading
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
                        <Button variant="outlined" size='small' onClick={scrollToReviews}>
                            Посмотреть отзывы
                        </Button>
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
                <Typography variant='h6' sx={{paddingTop: '15px'}}>Смотреть онлайн</Typography>
                <VideoPlayer/>
            </Stack>
            {responseExternalPlatforms.data && responseExternalPlatforms.data.items.length > 0 && (
                <Stack spacing={1} alignItems="center" justifyContent='center' color='primary'>
                    <Typography variant='h6' py={1}>Доступные платформы для просмотра</Typography>
                    <Stack flexDirection='row' gap={1}>
                        {responseExternalPlatforms.data.items.map(platform => (
                            <Button
                                key={platform.platform}
                                href={platform.url}
                                target="_blank"
                                variant="outlined"
                                startIcon={<img src={platform.logoUrl} alt={platform.platform} width={20} height={20} style={{borderRadius: '5px'}}/>}
                            >
                                {platform.platform}
                            </Button>
                        ))}
                    </Stack>

                </Stack>
            )}
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
            {responseSimilarFilms.data && (
                <Stack alignItems="center" justifyContent='center'>
                    <Typography variant='h6' py={2}>Похожие фильмы</Typography>
                    <Stack direction='row' flexWrap='wrap' alignItems="center" justifyContent='center'>
                        {responseSimilarFilms.data.items.map((el) => (
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
            <div ref={reviewRef}>
                {!isLoad ? (
                    <Box sx={{ width: '100%'}} py={2}>
                        <LinearProgress color="success"/>
                    </Box>
                ) : (
                    responseFilmReviews.data && responseFilmReviews.data.items.length > 0 ? (
                        <Stack spacing={2} mt={4} alignItems="center">
                            <Typography variant="h6">Отзывы</Typography>
                            {responseFilmReviews.data && responseFilmReviews.data.items.map((review) => (
                                <Box key={review.kinopoiskId} sx={{ border: '1px solid #ccc', borderRadius: 1, padding: 2, width: '100%' }}>
                                    <Typography variant="subtitle1">{review.author}</Typography>
                                    <Typography variant="body2" color="text.secondary">{review.date}</Typography>
                                    <Typography variant="body1" gutterBottom>{review.title}</Typography>
                                    <Typography variant="body2">{review.description}</Typography>
                                    <Stack display="flex" paddingTop={1} spacing={1} direction='row'>
                                        <Typography variant="caption" color="green">👍 {review.positiveRating}</Typography>
                                        <Typography variant="caption" color="red">👎 {review.negativeRating}</Typography>
                                    </Stack>
                                </Box>
                            ))}
                        </Stack>
                    ) : null
                )}
            </div>
        </Stack>
    );
};

export default MovieDetail;