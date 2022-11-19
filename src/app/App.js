import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import theme from "../modules/theme";
import routes from "../routes/router";
import "./App.css";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={routes} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
