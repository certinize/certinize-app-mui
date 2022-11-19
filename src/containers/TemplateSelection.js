import { Box, Tooltip, Typography } from "@mui/material";
import Image from "mui-image";
import { PropTypes } from "prop-types";
import React from "react";

const defaultTemplates = [
  "https://ik.imagekit.io/8cak25qyf/certinize-bucket/certificate-template-1_4gG2qQpkd.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668746096842",
  "https://ik.imagekit.io/8cak25qyf/certinize-bucket/certificate-template-2_kitgaf_gV.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668746097362",
  "https://ik.imagekit.io/8cak25qyf/certinize-bucket/certificate-template-3_PuUl9ND9o.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668746096796",
];

const partners = [
  {
    url: "https://certificatemagic.com/create.php",
    logo: "https://certificatemagic.com/images/certmagiclogo.png",
  },
  {
    url: "https://www.canva.com/create/certificates/",
    logo: "https://static.canva.com/web/images/c312071b10daa85e10047f326751843d.svg",
  },
];

const TemplateSelection = ({ certTemplate, setTemplate }) => {
  const inputRef = React.useRef();
  const [templateFile, setTemplateFile] = React.useState(null);

  const readURL = (file) => {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = (e) => res(e.target.result);
      reader.onerror = (e) => rej(e);

      try {
        reader.readAsDataURL(file);
      } catch (e) {
        console.error(e.message);
      }
    });
  };

  React.useEffect(() => {
    readURL(templateFile).then((res) => {
      setTemplate(res);
    });
  }, [templateFile]);

  return (
    <Box
      sx={{
        height: "80%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 10,
        marginTop: 10,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Typography variant="h5">
          You might want to create a new template...
        </Typography>
        <Box sx={{ display: "flex", gap: 4 }}>
          {partners.map((partner, index) => (
            <Tooltip title="Choose this template" key={index}>
              <Box>
                <Image
                  height={40}
                  width={100}
                  shift="right"
                  fit="contain"
                  variant="square"
                  src={partner.logo}
                  onClick={() => window.open(partner.url, "_blank")}
                  sx={{
                    padding: 1,
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    boxShadow: 1,
                    transition: "box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow: 4,
                      cursor: "pointer",
                    },
                  }}
                />
              </Box>
            </Tooltip>
          ))}
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Typography variant="h5">
          Choose a premade template from our collection:
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
          }}
        >
          {defaultTemplates.map((template, index) => (
            <Image
              key={index}
              src={template}
              width={300}
              sx={{
                border: "1px solid #ccc",
                boxShadow: 1,
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  cursor: "pointer",
                  boxShadow: 4,
                },
              }}
              onClick={() => setTemplate(template)}
            />
          ))}
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Typography variant="h5">
          Already have a template? Upload it here:
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            "@media (max-width: 768px)": {
              flexDirection: "column",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              "@media (max-width: 768px)": {
                flexDirection: "column",
              },
            }}
          >
            <Box
              sx={{
                height: 50,
                width: 400,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                boxShadow: "0 0.125rem 0.125rem 0 rgba(0,0,0,0.5);",
                borderRadius: 2,
              }}
              onClick={() => inputRef.current.click()}
            >
              <Box
                sx={{
                  height: "100%",
                  width: 120,
                  minWidth: 120,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#D9D9D9",
                  padding: "0 0.625rem",
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                  "&:hover": {
                    backgroundColor: "#c3c3c3",
                    cursor: "pointer",
                  },
                }}
              >
                <b>Choose File</b>
              </Box>
              <Box
                sx={{
                  width: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 0.625rem",
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {templateFile?.name}
                </span>
              </Box>

              <input
                style={{ display: "none" }}
                type="file"
                onChange={(e) => setTemplateFile(e.target.files[0])}
                ref={inputRef}
              />
            </Box>
          </Box>
          <Image
            src={certTemplate}
            height={300}
            fit="contain"
            easing="ease"
            shift="top"
            siftDuration={1000}
          />
        </Box>
      </Box>
    </Box>
  );
};

TemplateSelection.propTypes = {
  certTemplate: PropTypes.string.isRequired,
  setTemplate: PropTypes.func.isRequired,
};

export default TemplateSelection;
