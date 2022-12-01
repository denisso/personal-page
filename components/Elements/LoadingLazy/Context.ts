import React from "react";

export const Context = React.createContext<{
    onload: ({ load: boolean }) => void;
}>({
    onload: () => undefined,
});
