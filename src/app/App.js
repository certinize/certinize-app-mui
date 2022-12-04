import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import store from "../app/store";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import WalletContextProvider from "../components/WalletContextProvider";
import CertVerification from "../containers/CertVerification";
import Issuance from "../containers/Issuance";
import IssuanceGallery from "../containers/IssuanceGallery";
import IssuerVerification from "../containers/IssuerVerification";
import Profile from "../containers/Profile";
import Verification from "../containers/Verification";
import Welcome from "../containers/Welcome";
import "../index.css";
import theme from "../modules/theme";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <WalletContextProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/issuer-verification" element={<Verification />} />
              <Route path="/verification/" element={<CertVerification />} />
              <Route
                path="/verification/:tokenAddress"
                element={<CertVerification />}
              />
              <Route element={<ResponsiveAppBar />}>
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/" element={<Issuance />} />
                <Route path="/issuance" element={<Issuance />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/verification-request"
                  element={<IssuerVerification />}
                />
                <Route path="/issuance-gallery" element={<IssuanceGallery />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </WalletContextProvider>
    </Provider>
  );
}

export default App;
