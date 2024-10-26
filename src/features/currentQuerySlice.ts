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

        //TODO add actions
        // increment: (state) => {
        //     // Redux Toolkit allows us to write "mutating" logic in reducers. It
        //     // doesn't actually mutate the state because it uses the Immer library,
        //     // which detects changes to a "draft state" and produces a brand new
        //     // immutable state based off those changes
        //     state.value += 1
        // },
        // decrement: (state) => {
        //     state.value -= 1
        // },
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload
        // },
    },
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = currentQuerySlice.actions

export default currentQuerySlice.reducer