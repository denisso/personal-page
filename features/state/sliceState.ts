import { createSlice } from "@reduxjs/toolkit";

export type TState = {
    articles?: number;
};

const slice = createSlice({
    name: "state",
    initialState: { articles: 0 },
    reducers: {
        updateState: (state, action: { payload: TState }) => {
            for (const [key, value] of Object.entries(action.payload)) {
                if (state[key] !== undefined) state[key] = value;
            }
        },
    },
});

export const reducerState = slice.reducer;

export const selectState = ({ state }: { state: TState }) => state;
export const selectArticles = ({ state }: { state: TState }) => ({
    articles: state.articles,
});
export const { updateState } = slice.actions;
