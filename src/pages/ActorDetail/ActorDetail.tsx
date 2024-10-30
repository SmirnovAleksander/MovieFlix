import {useNavigate, useParams} from "react-router-dom";
import {useGetStuffInfoQuery} from "../../services/kinopoiskApi.ts";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingElement from "../../components/LoadingElement";
import Grid from "@mui/material/Grid2";
import {Button, Stack, Typography, Link, IconButton} from "@mui/material";
import {ArrowBack, Language} from "@mui/icons-material";
import MiniMovieCard from "../../components/MiniMovieCard";

const ActorDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {data, error, isLoading} = useGetStuffInfoQuery({id: id!});
    if (error) return <ErrorMessage/>;
    if (isLoading) return <LoadingElement/>;

    const filteredDublicateFilms = data?.films?.filter((item, index, self) => index === self.findIndex(el => el.filmId === item.filmId))
    const uniqueFilmIds = Array.from(new Set(filteredDublicateFilms?.map((film) => film.filmId)));
    console.log('Ides: ', uniqueFilmIds)
    return (
        <Stack py={2}>
            <Grid container spacing={2}>
                <Grid size={4} sx={{xs: 12}}>
                    <img
                        src={data?.posterUrl}
                        alt={data?.nameRu}
                        width="100%"
                        />
                    <Grid container spacing={2}>
                        <Grid size={12} >
                            <Button variant='outlined' target='_blank' endIcon={<Language/>} href={data?.webUrl || ""}>Кинопоиск</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid size={6} sx={{sm: 12}}>
                    <Grid container>
                        <Grid size={1}>
                            <IconButton onClick={() => navigate(-1)}>
                                <ArrowBack/>
                            </IconButton>
                        </Grid>
                        <Grid alignItems="center" justifyContent="center">
                            <Typography variant="h6">{data?.nameRu}</Typography>
                            <Typography variant="body2">{data?.nameEn}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container paddingTop={1}>
                        <Typography variant='h6'>Об актере:</Typography>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid size={6}>Карьера/профессия</Grid>
                        <Grid size={6}>
                            <Typography variant="body2" >
                                {data?.profession}
                            </Typography>
                        </Grid>

                        {data?.birthday && (
                            <>
                                <Grid size={6}>Дата рождения</Grid>
                                <Grid size={6}>
                                    <Typography variant="body2" >
                                        {data?.birthday} ({data?.age} лет)
                                    </Typography>
                                </Grid>
                            </>
                        )}
                        {data?.birthplace && (
                            <>
                                <Grid size={6}>Место рождения</Grid>
                                <Grid size={6}>
                                    <Typography variant="body2" >
                                        {data?.birthplace}
                                    </Typography>
                                </Grid>
                            </>
                        )}
                        {data?.death && (
                            <>
                                <Grid size={6}>Дата смерти</Grid>
                                <Grid size={6}>
                                    <Typography variant="body2" >
                                        {data?.death}
                                    </Typography>
                                </Grid>
                            </>
                        )}
                        {data?.deathplace && (
                            <>
                                <Grid size={6}>Место смерти</Grid>
                                <Grid size={6}>
                                    <Typography variant="body2" >
                                        {data?.deathplace}
                                    </Typography>
                                </Grid>
                            </>
                        )}
                        {data?.films && (
                            <>
                                <Grid size={6}>Количество фильмов</Grid>
                                <Grid size={6}>
                                    <Typography variant="body2" >
                                        {data?.films.length}
                                    </Typography>
                                </Grid>
                            </>
                        )}
                        {data?.growth && (
                            <>
                                <Grid size={6}>Рост</Grid>
                                <Grid size={6}>
                                    <Typography variant="body2" >
                                        {data?.growth} см
                                    </Typography>
                                </Grid>
                            </>
                        )}
                        {data?.facts && data.facts.length > 0 && (
                            <>
                                <Grid size={12}>Описание:</Grid>
                                <Grid size={12}>
                                    {data.facts.map((line) => (
                                        <Typography key={line} variant="body2">
                                            {line}
                                        </Typography>
                                    ))}
                                </Grid>

                                <Grid size={6}>Полое имя:</Grid>
                                <Grid size={6}>
                                    <Typography key={data.facts[1]} variant="body2">
                                        {data.facts[1].slice(12)}
                                    </Typography>
                                </Grid>
                            </>
                        )}
                        {data?.spouses && data.spouses.length > 0 && (
                            <>
                                <Grid size={6}>Супруг / супруга:</Grid>
                                <Grid size={6}>
                                    {data.spouses.map((spouse) => (
                                        <Typography variant="body2" key={spouse.personId}>
                                            <Link href={spouse.webUrl} target="_blank" rel="noopener noreferrer">
                                                {spouse.name}
                                            </Link>
                                        </Typography>
                                    ))}
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            <Stack direction="column" spacing={2} py={2}>
                <Typography variant={'h5'}>Фильмы: </Typography>
                <Stack flexDirection={"row"} flexWrap={"wrap"}>
                    {uniqueFilmIds.map((filmId) => (
                        <MiniMovieCard filmId={filmId} key={filmId}/>
                    ))}
                </Stack>

            </Stack>
        </Stack>
    );
};

export default ActorDetail;