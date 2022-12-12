import type { TColors } from "../themeStyles";

interface IstylizeMuiInput {
    (colors: TColors): { MuiOutlinedInput: { [key: string]: any } };
}

const getStyles = (colors: TColors) => ({
    borderColor: colors.color1[600],
    color: colors.color1[600],
    borderRadius: 8,
    borderWidth: 3,
});
export const stylizeMuiInput: IstylizeMuiInput = (colors: TColors) => {
    return {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "&:hover .MuiOutlinedInput-notchedOutline": getStyles(colors),
                    "& .MuiOutlinedInput-notchedOutline": getStyles(colors),
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": getStyles(colors),
                },
            },
        },
    };
};
