import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
  },

  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "3rem",
    },
  },

  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#242424",
          height: "70vh",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: "105px",
          fontWeight: 700,
        },
      },
    },
  },
});

export default theme;
