/* eslint-disable no-unused-vars */
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button, keyframes } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import PropTypes from "prop-types";
import React from "react";

const glow = keyframes`
from {
  box-shadow: 0 0 0 0 rgba(73, 92, 131, 1);
}
to {
  box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
}`;

const Navigation = ({ nextPart, setNextPart, pageSections }) => {
  const [currentSection, setCurrentSection] = React.useState(0);
  const scrollIntoView = (index) => {
    const element = document.getElementById(
      pageSections[index].title.replace(/\s/g, "")
    );
    element.scrollIntoView({ behavior: "smooth" });
    setCurrentSection(index);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: "40%",
        bottom: 16,
        right: 16,
        zIndex: 999,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          padding: 1,
          display: "flex",
          flexDirection: "column",
          background: "primary.",
          borderRadius: 6,
          paddingLeft: "0.625rem !important",
          paddingRight: "0.625rem !important",
          paddingBottom: 2,
          paddingTop: 2,
          boxShadow: "0px 2px 6px 0px rgba(0,0,0,0.75);",
        }}
      >
        <Button
          sx={{ color: "black" }}
          onClick={() => window.location.reload()}
        >
          <CloseIcon fontSize="large" />
        </Button>
        <Button
          sx={{ color: "black" }}
          onClick={() => scrollIntoView(currentSection - 1)}
        >
          <KeyboardArrowUpIcon fontSize="large" />
        </Button>
        <Button
          sx={{
            color: "black",
            animation: nextPart ? `${glow} 1s ease infinite` : "",
          }}
          onClick={() => {
            setNextPart(!nextPart);
            scrollIntoView(currentSection + 1);
          }}
        >
          <KeyboardArrowDownIcon fontSize="large" />
        </Button>
      </Container>
    </Box>
  );
};

Navigation.propTypes = {
  nextPart: PropTypes.bool.isRequired,
  setNextPart: PropTypes.func.isRequired,
  pageSections: PropTypes.array.isRequired,
};

export default Navigation;
