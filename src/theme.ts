import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: 'light', // или 'dark'
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
});


export default theme;
