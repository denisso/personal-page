import { TMenu } from "../lib/types";

export enum EErrorAPI {
    noError = "no error",
    limitReached = "the plan limit has been reached", // the plan limit has been reached, it is useless to try until the end of the period
    requestError = "request error, you can try to update later", // request error, you can try to update later
}

export type TErrorAPI = {
    error: EErrorAPI | false
}

export const errorContentful: { error: EErrorAPI  } = {
    error: EErrorAPI.noError,
};

export const menu: TMenu = { menu: [] };
