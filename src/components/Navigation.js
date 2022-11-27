import NavigationIcon from "@mui/icons-material/Navigation";
import { Fab } from "@mui/material";
import "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

const getHeightOfHeader = () => {
  const header = document.getElementsByTagName("header")[0];
  const headerHeight = header?.getBoundingClientRect().height;
  return headerHeight;
};

const getHeight = () => {
  const headerHeight = getHeightOfHeader() + 32;
  const height = window.innerHeight - headerHeight;
  const percentage = (height / window.innerHeight) * 100;
  return percentage;
};

const Navigation = () => {
  const [navHeight, setNavHeight] = React.useState();

  const handleUpClick = () => {
    window.scrollBy({ left: 0, top: -window.innerHeight, behavior: "smooth" });
  };

  const handleDownClick = () => {
    window.scrollBy({ left: 0, top: window.innerHeight, behavior: "smooth" });
  };

  React.useEffect(() => {
    setNavHeight(getHeight());

    window.addEventListener("resize", () => {
      setNavHeight(getHeight());
    });
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: `${navHeight}%`,
      }}
    >
      <Fab color="primary" aria-label="navigation" onClick={handleUpClick}>
        <NavigationIcon />
      </Fab>
      <Fab color="primary" aria-label="navigation" onClick={handleDownClick}>
        <NavigationIcon sx={{ transform: "rotate(180deg)" }} />
      </Fab>
      {/* <Container
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
      </Container> */}
    </Box>
  );
};

export default Navigation;
