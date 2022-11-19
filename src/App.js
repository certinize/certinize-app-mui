import { ThemeProvider } from "@mui/material/styles";
import React from "react";

import "./App.css";
import Dashboard from "./containers/Dashboard";
import theme from "./modules/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
