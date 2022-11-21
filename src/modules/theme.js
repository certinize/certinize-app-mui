import { green, grey, red, yellow } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const rawTheme = createTheme({
  palette: {
    primary: {
      main: "#495C83",
    },
    secondary: {
      main: "#7A86B6",
    },
    warning: {
      main: yellow[400],
    },
    error: {
      main: red[400],
    },
    success: {
      main: green[400],
    },
  },
  typography: {
    fontSize: 14,
  },
});

const theme = {
  ...rawTheme,
  palette: {
    ...rawTheme.palette,
    background: {
      ...rawTheme.palette.background,
      default: rawTheme.palette.common.white,
      placeholder: grey[200],
    },
  },
};

export default theme;
