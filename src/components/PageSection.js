/* eslint-disable no-unused-vars */
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import { PropTypes } from "prop-types";
import React from "react";
import { useInView } from "react-intersection-observer";

const PageSection = ({ icon, title, description, children, height }) => {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const [pageHeight, setPageHeight] = React.useState(height);

  React.useEffect(() => {
    if (window.innerHeight > 900) {
      setPageHeight(height);
    } else {
      setPageHeight(height + 40);
    }

    window.addEventListener("resize", () => {
      if (window.innerHeight > 900) {
        setPageHeight(height);
      } else {
        setPageHeight(height + 60);
      }
    });
  }, []);

  return (
    <Container
      id={title.replace(/\s/g, "")}
      sx={{
        marginTop: 2,
        height: `${pageHeight}vh`,
      }}
      ref={ref}
    >
      <Grid
        container
        spacing={2}
        columns={14}
        sx={{
          flexWrap: "nowrap !important",
        }}
      >
        <Grid item xs={1}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              width: "25rem",
            }}
          >
            {icon}
            <p
              style={{
                marginLeft: 12,
                flexGrow: 1,
                color: "#1A799D",
                fontSize: 24,
              }}
            >
              <b>{title}</b>
            </p>
          </Box>
          <Collapse in={inView} timeout={500}>
            <Box
              style={{
                marginLeft: 22,
                borderLeft: "2px solid #1389B5",
                height: `${pageHeight - 10}vh`,
              }}
            ></Box>
          </Collapse>
        </Grid>
        <Box sx={{ flexGrow: 1 }}>
          <Fade
            in={inView}
            sx={{ transitionDelay: inView ? "500ms" : "0ms" }}
            mountOnEnter
            unmountOnExit
          >
            <Grid item xs={14}>
              <Box sx={{ mt: 10 }}>
                <p style={{ color: "#1A799D" }}>{description}</p>
              </Box>
              {children}
            </Grid>
          </Fade>
        </Box>
      </Grid>
    </Container>
  );
};

PageSection.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  height: PropTypes.number,
};

export default PageSection;
