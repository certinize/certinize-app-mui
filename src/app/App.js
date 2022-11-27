import React from "react";
import { Route, Routes } from "react-router-dom";

import ResponsiveAppBar from "../components/ResponsiveAppBar";
import CertVerification from "../containers/CertVerification";
import Issuance from "../containers/Issuance";
import IssuerVerification from "../containers/IssuerVerification";
import Profile from "../containers/Profile";
import Verification from "../containers/Verification";
import Welcome from "../containers/Welcome";
import "./App.css";

function App() {
  return (
    <>
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
