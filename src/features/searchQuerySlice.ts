import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface searchQueryInterface {
    countries: string,
    genreId: string,
    order: string,
    type: string,
    year: string,
    page: number,
    keyword: string
}

const initialState: searchQueryInterface = {
    countries: '',
    genreId: '',
    order: 'NUM_VOTE',
    type: '',
    year: '',
    page: 1,
    keyword: ''
}

export const searchQuerySlice = createSlice({
    name: 'searchQuerySlice',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<Partial<searchQueryInterface>>) => ({
            ...state,
            ...action.payload,
        }),
    },
})

export const {setSearchQuery} = searchQuerySlice.actions;
export default searchQuerySlice.reducer