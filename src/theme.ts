import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // или 'dark'
    primary: {
      main: "#1976d2",
      light: "#63a4ff",
      dark: "#004ba0",
      contrastText: "#fff",
    },
    secondary: {
      main: "#dc004e",
      light: "#ff5c8d",
      dark: "#9a0036",
      contrastText: "#000",
    },
    // Дополнительные цвета
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 300,
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 300,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 400,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 400,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 400,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "1.25rem",
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 400,
    },
  },
});

export default theme;
