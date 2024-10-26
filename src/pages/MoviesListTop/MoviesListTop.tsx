import {useGetFilmsTopQuery} from "../../services/kinopoiskApi.ts";

const MoviesListTop = () => {
    const {data, error, isLoading} = useGetFilmsTopQuery({type: 'TOP_POPULAR_ALL', page: 1});
    console.log(data, error, isLoading);

    return (
        <div>
            MoviesListTop
        </div>
    );
};

export default MoviesListTop;