import { createSlice } from "@reduxjs/toolkit";
import { TModalHookProps } from "./useModal";

const slice = createSlice({
    name: "modal",
    initialState: { current: "allClosed" },
    reducers: {
        openModal: (
            state,
            action: { payload: { modal: keyof TModalHookProps } }
        ) => {
            state.current = action.payload.modal;
        },
    },
});

export const reducerModal = slice.reducer;

export const selectModal = (arg: { modal: keyof TModalHookProps }) => {
    return ({modal}: {modal: { current: keyof TModalHookProps }}) => {
        return modal.current === arg.modal;
    }
        
};
export const { openModal } = slice.actions;
