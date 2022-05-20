import { createTheme } from "@nextui-org/react";

const theme = createTheme({
  type: "light",
  theme: {
    colors: {
      primary: "$blue500",
      myColor: "#FF0022",
      gradient:
        "linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)",
    },
    fonts: {
      sans: "'Montserrat', sans-serif",
    },
  },
});

export default theme;
