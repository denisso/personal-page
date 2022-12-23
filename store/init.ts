import { fetchGetMenu } from "../features/state";

let interval: any;
export const init = (store: any) => {
    store.dispatch(fetchGetMenu())
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => store.dispatch(fetchGetMenu()), 10000);
};
