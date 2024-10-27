import { createSlice } from '@reduxjs/toolkit'

export interface currentQueryInterface {
    countries: string,
    genreId: string,
    order: string,
    type: string,
    year: string,
    page: number,
}

const initialState: currentQueryInterface = {
    countries: '',
    genreId: '',
    order: 'NUM_VOTE',
    type: '',
    year: '',
    page: 1
}

export const currentQuerySlice = createSlice({
    name: 'currentQuerySlice',
    initialState,
    reducers: {

    },
})

export default currentQuerySlice.reducer