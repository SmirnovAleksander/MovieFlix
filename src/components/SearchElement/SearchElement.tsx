import {Autocomplete, TextField} from "@mui/material";
import {useGetFilmsQuery} from "../../services/kinopoiskApi.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store.ts";
import {FilmInfo} from "../../app/types.ts";
import LoadingElement from "../LoadingElement";
import {useEffect, useState} from "react";
import {setSearchQuery} from "../../features/searchQuerySlice.ts";
// import {useNavigate} from "react-router-dom";

const SearchElement = () => {
    // const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const {countries, genreId, order, type, year, keyword, page} = useSelector((state: RootState) => state.searchQuery)
    const [input, setInput] = useState("");

    useEffect(() => {
        const setTimeOutId = setTimeout(() => {
            dispatch(setSearchQuery({keyword: input}));
        }, 500)
        return () => clearTimeout(setTimeOutId);
    }, [input]);

    const {data, isLoading} = useGetFilmsQuery({
        countries,
        genreId,
        order,
        type,
        year,
        keyword,
        page
    })
    if (isLoading) return <LoadingElement/>
    return (
        <Autocomplete
            id="free-solo-demo"
            size='small'
            freeSolo
            sx={{width: 300}}
            options={data ? data.items.map((option: FilmInfo) => `${option.nameRu} - ${option.year}`) : []}
            onInputChange={(_, value) => {
                setInput(value)
            }}
            renderInput={(params) => <TextField {...params} label="Поиск"/>}
        />
    );
};

export default SearchElement;