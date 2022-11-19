import Container from "@mui/material/Container";
import React from "react";

import Navigation from "../components/Navigation";
import ResponsiveAppBar from "../components/ResponsiveAppBar";

const Dashboard = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Navigation />
      <Container>
        <h1>Dashboard</h1>
      </Container>
    </>
  );
};

export default Dashboard;
