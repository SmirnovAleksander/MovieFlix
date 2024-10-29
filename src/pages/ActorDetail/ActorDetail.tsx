import {useNavigate, useParams, Link as RouterLink} from "react-router-dom";
import {useGetStuffInfoQuery} from "../../services/kinopoiskApi.ts";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingElement from "../../components/LoadingElement";
import Grid from "@mui/material/Grid2";
import {Button, Stack, Typography, Link} from "@mui/material";
import {ArrowBack, Language} from "@mui/icons-material";

const ActorDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {data, error, isLoading} = useGetStuffInfoQuery({id: id!});

    if (error) return <ErrorMessage/>;
    if (isLoading) return <LoadingElement/>;
    const filteredDublicateFilms = data?.films?.filter((item, index, self) => index === self.findIndex(el => el.filmId === item.filmId))

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
                            <Button target='_blank' endIcon={<Language/>} href={data?.webUrl || ""}>Кинопоиск</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid size={6} sx={{sm: 12}}>
                    <Grid container>
                        <Grid size={2}>
                            <Button startIcon={<ArrowBack/>} onClick={() => navigate(-1)}/>
                        </Grid>
                        <Grid alignItems="center" justifyContent="center">
                            <Typography variant="h6">{data?.nameRu}</Typography>
                            <Typography variant="body2">{data?.nameEn}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
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
                                    <Typography key={data.facts[0]} variant="body2">
                                        {data.facts[0]}
                                    </Typography>
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
                                <Grid size={6}>Супруги:</Grid>
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
            <Stack>
                {filteredDublicateFilms?.map((film, index) => (
                    <Grid container size={12} key={index}>
                        <Grid size={5}>
                            <Link component={RouterLink} to={`/movie/${film.filmId}`}>
                                {film.nameRu ? film.nameRu : film.nameEn}
                            </Link>
                        </Grid>
                        <Grid size={6}>
                            <Typography variant="body2" >
                                {film.rating ? film.rating : '----'}
                            </Typography>
                        </Grid>
                    </Grid>
                ))}
            </Stack>
        </Stack>
    );
};

export default ActorDetail;