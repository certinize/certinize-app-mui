import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Dashboard from "../containers/Dashboard";
import Issuance from "../containers/Issuance";
import IssuerVerification from "../containers/IssuerVerification";
import Landing from "../containers/Landing";
import Profile from "../containers/Profile";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/issuance",
    element: <Issuance />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/issuer-verification",
    element: <IssuerVerification />,
  },
]);

export default routes;
