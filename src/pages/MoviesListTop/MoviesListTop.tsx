import {useGetFilmsTopQuery} from "../../services/kinopoiskApi.ts";
import {useEffect, useState} from "react";
import {TopList} from "../../constants/constants.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {IconButton, Stack, Typography} from "@mui/material";
import MoviesList from "../../components/MoviesList";
import ErrorMessage from "../../components/ErrorMessage";
import MoviesListSkeleton from "../../components/MoviesListSkeleton";
import {ArrowBack} from "@mui/icons-material";

const MoviesListTop = () => {
    const location = useLocation();
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const movieType = TopList.find(el => el.url === location.pathname);
    if (!movieType) {
        throw new Error("No movies found.");
    }
    const {data, error, isLoading} = useGetFilmsTopQuery({
        type: movieType.value,
        page: page
    });
    useEffect(() => {
        setPage(1);
    }, [location.pathname]);
    if (error) return <ErrorMessage/>;
    if (isLoading) return <MoviesListSkeleton/>;
    return (
        <>
            <Stack flexDirection="row" alignItems='center' py={1} >
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBack/>
                </IconButton>
                <Typography variant="h6" px={1}>{movieType.title}</Typography>
            </Stack>
            <MoviesList movies={data?.items || []} totalPages={data?.totalPages || 0} page={page} setPage={setPage} />
        </>
    );
};

export default MoviesListTop;