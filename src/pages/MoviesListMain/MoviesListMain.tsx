import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import ErrorMessage from "../../components/ErrorMessage";
import MoviesListSkeleton from "../../components/MoviesListSkeleton";
import {IconButton, Stack, Typography} from "@mui/material";
import MoviesList from "../../components/MoviesList";
import {MovieList} from "../../constants/constants.ts";
import {useGetFilmsQuery, useGetGenresAndCountriesQuery} from "../../services/kinopoiskApi.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store.ts";
import SelectMovies from "../../components/SelectMovies";
import {ArrowBack} from "@mui/icons-material";

const MoviesListMain = () => {
    const location = useLocation();
    const {countries, order, year, genreId} = useSelector((state: RootState) => state.currentQuery);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const movieType = MovieList.find(el => el.url === location.pathname);
    if (!movieType) {
        throw new Error("No movies found.");
    }
    const myGenreId = movieType.url === '/cartoons' ? '18' : genreId;

    const responseFilms = useGetFilmsQuery({
        type: movieType.value,
        page,
        countries,
        order,
        year,
        genreId: myGenreId
    })
    const responseGenresAndCountries = useGetGenresAndCountriesQuery(undefined);
    useEffect(() => {
        setPage(1);
    }, [location.pathname]);


    if (responseFilms.error || responseGenresAndCountries.error) return <ErrorMessage/>;
    if (responseFilms.isLoading || responseGenresAndCountries.isLoading) return <MoviesListSkeleton/>;

    return (
        <>
            <Stack alignItems='center' justifyContent='center' py={2}>
                <SelectMovies
                    countiesList={responseGenresAndCountries.data?.countries || []}
                    genresList={responseGenresAndCountries.data?.genres || []}
                    countries={countries}
                    order={order}
                    year={year}
                    genreId={genreId}
                />
            </Stack>
            <Stack flexDirection="row" alignItems='center' py={1} >
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBack/>
                </IconButton>
                <Typography variant="h6" px={1}>{movieType.title}</Typography>
            </Stack>
            <MoviesList movies={responseFilms.data?.items || []} totalPages={responseFilms.data?.totalPages || 0} page={page} setPage={setPage} />
        </>
    );
};

export default MoviesListMain;