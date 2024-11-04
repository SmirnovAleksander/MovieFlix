import {Autocomplete, TextField} from "@mui/material";
import {useGetFilmsQuery} from "../../services/kinopoiskApi.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store.ts";
import {useEffect, useState} from "react";
import {setSearchQuery} from "../../features/searchQuerySlice.ts";
import {FilmItem} from "../../app/ApiTypes/FilmItemApi.types.ts";
import {useNavigate} from "react-router-dom";
const moviesTypes: Record<string, string> = {
    FILM: 'Фильм',
    TV_SERIES: 'Сериалы',
    TV_SHOW: 'ТВ-Шоу',
    MINI_SERIES: 'Мини-сериалы',
    ALL: 'Фильм'
}

const SearchElement = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const {countries, genreId, order, type, year, keyword, page} = useSelector((state: RootState) => state.searchQuery)
    const [input, setInput] = useState("");

    useEffect(() => {
        const setTimeOutId = setTimeout(() => {
            dispatch(setSearchQuery({keyword: input}));
        }, 500)
        return () => clearTimeout(setTimeOutId);
    }, [input]);

    const {data} = useGetFilmsQuery({
        countries,
        genreId,
        order,
        type,
        year,
        keyword,
        page
    })
    return (
        <Autocomplete<FilmItem>
            id="free-solo-demo"
            size='small'
            freeSolo={false}
            sx={{width: 300}}
            options={data ? data.items : []}
            onInputChange={(_, value) => {
                setInput(value)
            }}
            onChange={(_, value) => {
                navigate(`/movie/${value?.kinopoiskId}`)
            }}
            getOptionLabel={(option: FilmItem) => `${option.nameRu} - ${moviesTypes[option.type  as keyof typeof moviesTypes]} - ${option.year}`}
            renderInput={(params) => <TextField {...params} label="Поиск"/>}
        />
    );
};

export default SearchElement;