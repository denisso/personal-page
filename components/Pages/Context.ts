import React from "react";
import { TIntersectionMethods } from "../hooks/useIntersection";
export const Context = React.createContext<{
    addNode: TIntersectionMethods["addNode"];
}>({ addNode: () => null});
