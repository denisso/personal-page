import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { TMenuResponse } from "../../lib/contentful/getMenu";
import { TMenuItem } from "../../lib/types";

export type TState = {
    articles: number;
    menu: Array<TMenuItem>;
    error: string | boolean;
};

export const fetch = (url: string) =>
    new Promise((resolve, reject) => {
        axios
            .get(url)
            .then((response: AxiosResponse<TMenuResponse>) => {
                resolve(response.data.data);
            })
            .catch((err: AxiosError) => reject(err.message));
    });

export const fetchGetMenu = createAsyncThunk("state", async () => {
    return await fetch("/api/menu/getmenu")
});

const slice = createSlice({
    name: "state",
    initialState: { articles: 0, menu: [], error: false },
    reducers: {
        updateState: (state, action: { payload: Partial<TState> }) => {
            for (const [key, value] of Object.entries(action.payload)) {
                if (state[key] !== undefined) state[key] = value;
            }
        },
    },
    extraReducers(builder) {
        // @ts-expect-error: hush. and no problem
        builder.addCase(
            fetchGetMenu.fulfilled,
            (state, action: PayloadAction<TMenuResponse>) => {
                slice.caseReducers.updateState(state, {
                    // @ts-expect-error: hush. and no problem
                    payload: {
                        ...action.payload,
                    },
                });
            }
        ),
            
            builder.addCase(
                fetchGetMenu.rejected,
                (state, action) => {
                    slice.caseReducers.updateState(state, {
                        payload: {
                            // @ts-expect-error: hush. and no problem
                            error: action.payload,
                        },
                    });
                }
            );
    },
});

export const reducerState = slice.reducer;

export const selectState = ({ state }: { state: TState }) => state;
export const selectArticles = ({ state }: { state: TState }) => ({
    articles: state.articles,
});
export const { updateState } = slice.actions;
