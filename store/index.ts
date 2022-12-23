import { configureStore } from "@reduxjs/toolkit";
import { reducerMode } from "../features/theme/themeSlice";
import { reducerModal } from "../features/modal";
import { reducerState } from "../features/state";
import { init } from "./init";
export function makeStore() {
    return configureStore({
        reducer: {
            theme: reducerMode,
            modal: reducerModal,
            state: reducerState,
        },
    });
}

const store = makeStore();

init(store)
export default store;
