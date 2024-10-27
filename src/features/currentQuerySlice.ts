import {createSlice, PayloadAction} from '@reduxjs/toolkit'

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
        selectQuery: (state, action: PayloadAction<Partial<currentQueryInterface>>) => ({
            ...state,
            ...action.payload,
        }),
    },
})

export const {selectQuery} = currentQuerySlice.actions;
export default currentQuerySlice.reducer