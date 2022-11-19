import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Dashboard from "../containers/Dashboard";
import Issuance from "../containers/Issuance";

const routes = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/issuance",
    element: <Issuance />,
  },
]);

export default routes;
