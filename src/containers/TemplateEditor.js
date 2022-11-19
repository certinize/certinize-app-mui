import SaveIcon from "@mui/icons-material/Save";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { toSvg } from "html-to-image";
import { Image as MaterialImg } from "mui-image";
import PropTypes from "prop-types";
import React from "react";
import Draggable from "react-draggable";

const fontSizes = [
  "8",
  "9",
  "10",
  "11",
  "12",
  "14",
  "16",
  "18",
  "20",
  "22",
  "24",
  "26",
  "28",
  "36",
  "48",
  "54",
  "60",
  "66",
  "72",
  "80",
  "88",
  "90",
  "96",
];

const fontStyles = [
  "Arial",
  "Courier",
  "Georgia",
  "Times New Roman",
  "Verdana",
];

const TemplateEditor = ({ template, setCertMeta }) => {
  const [fontStyle, setFontStyle] = React.useState("Arial");
  const [fontSize, setFontSize] = React.useState(12);
  const [namePosition, setNamePosition] = React.useState({
    x: 0,
    y: 0,
  });
  
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const getElementPosition = (element) => {
    const rect = element.getBoundingClientRect();
    const imgSize = document
      .getElementById("templateImg")
      .getBoundingClientRect();

    // Get the center of rect relative to imageSize.
    const x = rect.left - imgSize.left + rect.width / 2;
    const y = rect.top - imgSize.top + rect.height / 2;

    return { x, y };
  };

  const handleDragOnStop = (e) => {
    const position = getElementPosition(e.target);

    setNamePosition(position);
  };

  const handleFontStyleChange = (e) => {
    setFontStyle(e.target.value);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const generateCertificate = () => {
    toSvg(document.getElementById("templateBox"), { quality: 1 }).then(
      (certDataUrl) => {
        setCertMeta({
          fontSize,
          fontStyle,
          namePosition,
          template,
          certDataUrl,
        });
      }
    );
  };

  return (
    <Container
      sx={{
        marginTop: 10,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 6,
            width: "100%",
          }}
        >
          <FormControl sx={{}}>
            <InputLabel id="certificate-font-style">Font Style</InputLabel>
            <Select
              labelId="certificate-font-style"
              id="fontStyle"
              value={fontStyle}
              label="Font Style"
              MenuProps={{
                disableScrollLock: true,
              }}
              onChange={handleFontStyleChange}
            >
              {fontStyles.map((style) => (
                <MenuItem key={style} value={style}>
                  {style}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              Choose the{" "}
              <b>
                <i>font style</i>
              </b>
            </FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel id="certificate-font-size">Font Size</InputLabel>
            <Select
              labelId="certificate-font-size"
              id="fontSize"
              value={fontSize}
              label="Font Size"
              MenuProps={{
                disableScrollLock: true,
              }}
              onChange={handleFontSizeChange}
            >
              {fontSizes.map((size) => (
                <MenuItem key={size} value={size}>
                  {`${size} pt`}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              Choose the{" "}
              <b>
                <i>font size</i>
              </b>
            </FormHelperText>
          </FormControl>
        </Box>

        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={() => {
            generateCertificate();
            sleep(1000).then(() => {
              document.getElementById("PreviewCertificate").scrollIntoView({
                behavior: "smooth",
              });
            });
          }}
          sx={{ height: 64 }}
        >
          Apply
        </Button>
      </Box>
      <Box
        id="templateBox"
        sx={{
          display: template ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          border: "1px solid #000",
        }}
      >
        <MaterialImg
          src={template}
          shift="left"
          id="templateImg"
          fit="contain"
        />
        <Draggable
          bounds="parent"
          defaultPosition={{ x: 0, y: 0 }}
          onStop={handleDragOnStop}
        >
          <Box
            sx={{
              position: "absolute",
              "&:hover": {
                cursor: "move",
              },
            }}
          >
            {template !== "" ? (
              <span
                style={{
                  fontSize: `${fontSize}px`,
                  fontFamily: fontStyle,
                }}
              >
                Drag me! I&apos;m a name placeholder.
              </span>
            ) : null}
          </Box>
        </Draggable>
      </Box>
    </Container>
  );
};

TemplateEditor.propTypes = {
  template: PropTypes.string.isRequired,
  setCertMeta: PropTypes.func.isRequired,
};

export default TemplateEditor;
