import { TColor } from "./themeStyles";
export const reverseColors = (colors: TColor): TColor => {
    const reColors: TColor = {};
    const arr1 = Array.from(Array(10), (x, index) => index * 100);
    arr1[0] = 50;
    const arr2 = ["A100", "A200", "A400", "A700"];

    for (let i = 0; i < arr1.length; i++) {
        reColors[arr1[i]] = colors[arr1[arr1.length - (i + 1)]];
    }
    for (let i = 0; i < arr2.length; i++) {
        reColors[arr2[i]] = colors[arr2[arr2.length - (i + 1)]];
    }
    return reColors;
};
