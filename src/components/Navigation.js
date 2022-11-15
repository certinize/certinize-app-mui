import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React from "react";

const Navigation = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "40%",
        bottom: 16,
        right: 16,
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
        <Button sx={{ color: "black" }}>
          <CloseIcon fontSize="large" />
        </Button>
        <Button sx={{ color: "black" }}>
          <KeyboardArrowUpIcon fontSize="large" />
        </Button>
        <Button sx={{ color: "black" }}>
          <KeyboardArrowDownIcon fontSize="large" />
        </Button>
      </Container>
    </Box>
  );
};

export default Navigation;
