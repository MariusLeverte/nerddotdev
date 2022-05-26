import { createTheme } from "@nextui-org/react";

const theme = createTheme({
  type: "light",
  theme: {
    colors: {
      primary: "$blue500",
      myColor: "#FF0022",
    },
    fonts: {
      sans: "'Montserrat', sans-serif",
    },
  },
});

export default theme;
