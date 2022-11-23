import React from "react";
import { Route, Routes } from "react-router-dom";

import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Issuance from "../containers/Issuance";
import IssuerVerification from "../containers/IssuerVerification";
import Profile from "../containers/Profile";
import Welcome from "../containers/Welcome";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/verification" element={<div />} />
        <Route element={<ResponsiveAppBar />}>
          <Route path="/" element={<Issuance />} />
          <Route path="/issuance" element={<Issuance />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/issuer-verification" element={<IssuerVerification />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
