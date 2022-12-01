import { createSlice } from "@reduxjs/toolkit";
import { light, dark } from "./themeStyles";

const slice = createSlice({
    name: "theme",
    initialState: { current: "light" },
    reducers: {
        switchMode: (state, action: { payload: { themeName: string } }) => {
            state.current = action?.payload?.themeName || "light";
        },
    },
});

export const reducerMode = slice.reducer;

type StateType = {
    theme: {
        current: string;
    };
};

export const selectTheme = ({ theme }: StateType) => {
    return theme.current === "light" ? light : dark;
};

export const selectThemeName = ({ theme }: StateType) => {
    return theme.current;
};

export const { switchMode } = slice.actions;
