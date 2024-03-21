import { generateColors } from "@mantine/colors-generator";
import { createTheme, rem } from "@mantine/core";


const theme = createTheme({
    primaryColor: "teal",
    primaryShade: { light: 0, dark: 9 },
    fontFamily: "Verdana, sans-serif",
    fontFamilyMonospace: "Monaco, Courier, monospace",
    headings: { fontFamily: "Greycliff CF, sans-serif" },
    colors: {
        purple: generateColors("#622CE1"),
        teal: generateColors("#1D5F66"),


        blue: generateColors("#4BD2E8"),
        "bright-blue": generateColors("#4BD2E8"),
        yellow: generateColors("#FEEF26"),
        white: generateColors('#EAEDF2'),
        grey: generateColors('#C6C9CE'),
        black: generateColors('#36383A')

    },
    fontSizes: {
        xs: rem(10),
        sm: rem(11),
        md: rem(14),
        lg: rem(16),
        xl: rem(20),
    },
    lineHeights: {
        xs: "1.4",
        sm: "1.45",
        md: "1.55",
        lg: "1.6",
        xl: "1.65",
    },
});

export { theme };

