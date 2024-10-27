import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Button, Stack} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {Country, Genre} from "../../app/types.ts";
import {AppDispatch} from "../../app/store.ts";
import {useDispatch} from "react-redux";
import {selectQuery} from "../../features/currentQuerySlice.ts";
import {useState} from "react";

interface SelectMoviesProps {
    countiesList: Country[],
    genresList: Genre[],
    countries: string,
    genreId: string,
    order: string,
    year: string,
}

const SelectMovies: React.FC<SelectMoviesProps> = ({countiesList, genresList, countries, genreId, order, year}) => {
    const dispatch: AppDispatch = useDispatch();

    //Сортировка
    const orderList = [
        {
            title: 'По рейтингу',
            value: 'RATING'
        },
        {
            title: 'По оценкам',
            value: 'NUM_VOTE'
        }
    ]

    const yearsList = new Array(60).fill(0).map((_, i) => ({
        title: new Date().getFullYear() - i,
        value: new Date().getFullYear() - i
    }));

    const [localCountries, setLocalCountries] = useState(countries);
    const [localGenreId, setLocalGenreId] = useState(genreId);
    const [localOrder, setLocalOrder] = useState(order);
    const [localYear, setLocalYear] = useState(year);


    const handleSearch = () => {
        dispatch(
            selectQuery({
                countries: localCountries,
                genreId: localGenreId,
                order: localOrder,
                year: localYear,
            })
        );
    };
    const handleClear = () => {
        setLocalCountries("");
        setLocalGenreId("");
        setLocalOrder("");
        setLocalYear("");

        dispatch(selectQuery({ countries: "", genreId: "", order: "NUM_VOTE", year: "" }));
    };
    return (
        <Stack sx={{flexDirection: {sm: 'column', md: 'row'}}}>
            <FormControl sx={{m: 1, minWidth: 150}} size='small'>
                <InputLabel>Сортировка</InputLabel>
                <Select
                    value={localOrder}
                    onChange={(e) => setLocalOrder(e.target.value)}
                    label="Сортировка"
                >
                    {orderList.map((el) => (
                        <MenuItem value={el.value} key={el.value}>{el.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{m: 1, minWidth: 150}} size='small'>
                <InputLabel>Страна</InputLabel>
                <Select
                    value={localCountries}
                    label="Страна"
                    onChange={(e) => setLocalCountries(e.target.value)}
                >
                    {countiesList.map((el) => (
                        <MenuItem value={el.id} key={el.id}>{el.country}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{m: 1, minWidth: 150}} size='small'>
                <InputLabel>Жанр</InputLabel>
                <Select
                    label="Жанр"
                    value={localGenreId}
                    onChange={(e) => setLocalGenreId(e.target.value)}
                >
                    {genresList.map((el) => (
                        <MenuItem value={el.id} key={el.id}>{el.genre}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{m: 1, minWidth: 150}} size='small'>
                <InputLabel>Год</InputLabel>
                <Select
                    label="Год"
                    value={localYear}
                    onChange={(e) => setLocalYear(e.target.value)}
                >
                    {yearsList.map((el) => (
                        <MenuItem value={el.value} key={el.title}>{el.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Stack alignItems="center" justifyContent='center'>
                <Button variant="outlined" startIcon={<CloseIcon/>} sx={{m: 1}} size='small' onClick={handleClear}>
                    Clear
                </Button>
            </Stack>
            <Stack alignItems="center" justifyContent='center'>
                <Button variant="outlined" sx={{m: 1}} size='small' onClick={handleSearch}>
                    Search
                </Button>
            </Stack>
        </Stack>
    );
};

export default SelectMovies;