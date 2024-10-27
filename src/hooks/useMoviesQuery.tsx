import {useGetFilmsQuery, useGetFilmsTopQuery} from "../services/kinopoiskApi.ts";
import {TopList} from "../constants/constants.ts";
import {useSelector} from "react-redux";
import {RootState} from "../app/store.ts";

const UseMoviesQuery = () => {
    const {countries, order, year, page} = useSelector((state: RootState) => state.currentQuery);
    const responsePopular = useGetFilmsTopQuery({
        type: TopList[0].value,
        page,
    });

    const responseBest = useGetFilmsTopQuery({
        type: TopList[1].value,
        page,
    });
    const responseFilms = useGetFilmsQuery({
        type: 'FILM',
        countries,
        genreId: '1',
        order,
        page,
        year,
    });

    const responseSerials =  useGetFilmsQuery({
        type: 'TV_SERIES',
        countries,
        genreId: '1',
        order,
        page,
        year,
    });

    const responseCartoons = useGetFilmsQuery({
        type: 'FILM',
        countries,
        genreId: '18',
        order,
        page,
        year,
    });

    const isLoading = responsePopular.isFetching
        || responseBest.isFetching
        || responseFilms.isFetching
        || responseSerials.isFetching
        || responseCartoons.isFetching;

    const isError = responsePopular.error
        || responseBest.error
        || responseFilms.error
        || responseSerials.error
        || responseCartoons.error;
    return {
        isLoading,
        isError,
        responsePopular,
        responseBest,
        responseFilms,
        responseSerials,
        responseCartoons
    }
};

export default UseMoviesQuery;