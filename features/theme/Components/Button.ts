import type { TColors } from "../themeStyles";

const general = {
    root: {
        borderRadius: 8,
        borderWidth: 3,
        "&:hover": {
            borderWidth: 3,
        },
    },
};

interface IstylizeMuiButton {
    (colors: TColors): { MuiButton: { [key: string]: any } };
}

export const stylizeMuiButton: IstylizeMuiButton = (colors: TColors) => {
    return {
        MuiButton: {
            styleOverrides: {
                ...general,
                text: {
                    backgroundColor: colors.colorRoot,
                    color: colors.color1[600],
                    "&:hover":{
                        backgroundColor: colors.colorRoot,
                        color: colors.color1[900],
                    }
                },
                outlined: {
                    backgroundColor: colors.colorRoot,
                    borderColor: colors.color1[600],
                    color: colors.color1[600],
                    "&:hover":{
                        backgroundColor: colors.colorRoot,
                        borderColor: colors.color1[900],
                        color: colors.color1[900],
                    }
                },
                contained: {
                    backgroundColor: colors.color1[600],
                    borderColor: colors.color1[600],
                    color: colors.colorRoot,
                    "&:hover":{
                        backgroundColor: colors.color1[900],
                        borderColor: colors.color1[900],
                        color: colors.colorRoot,
                    }
                },
            },
        },
    };
};


