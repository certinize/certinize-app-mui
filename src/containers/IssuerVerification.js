import { Box, FormControl, TextField, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { MuiFileInput } from "mui-file-input";
import React from "react";

const boxStyle = {
  marginTop: 4,
  bgcolor: "#F9F9F9",
  borderRadius: 4,
  boxShadow: "1px 2px 2px 2px #888888 ",
  width: 600,
  padding: 4,
};

export default function IssuerVerification() {
  const [orgId, setOrgId] = React.useState(null);
  const handleChange = (e) => setOrgId(e);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ marginBottom: 10 }}>
        <Box
          sx={{
            ...boxStyle,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h2">Get Verified!</Typography>
        </Box>
        <Box sx={boxStyle}>
          <FormControl sx={{ gap: 2, marginBottom: 4 }}>
            <Typography sx={{ fontWeight: "bold" }} variant="subtitle1">
              1. Enter your wallet private key.
            </Typography>
            <Typography>
              This will enable us to perform automated transactions on your
              behalf. You still need to sign each and every transaction the
              system needs to make.
            </Typography>
            <TextField
              id="walletPrivateKey"
              label="Enter private key"
              variant="outlined"
            />
          </FormControl>
        </Box>
        <Box sx={boxStyle}>
          <FormControl sx={{ gap: 2, marginBottom: 4 }}>
            <Typography sx={{ fontWeight: "bold" }} variant="subtitle1">
              2. Provide a link we can use to verify your organization&apos;s
              identity and credibility.
            </Typography>
            <Typography>Any of the following will work:</Typography>
            <ul>
              <li>
                <Typography paragraph={true}>
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    variant="subtitle1"
                    color="primary"
                  >
                    Google Trends
                  </Typography>
                  A profile on Google Trends with evidence of recent search
                  activity about your organization.
                </Typography>
              </li>
              <li>
                <Typography paragraph={true}>
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    variant="subtitle1"
                    color="primary"
                  >
                    Wikipedia article
                  </Typography>
                  A Wikipedia article that is about you and meets their
                  notability standards for people.
                </Typography>
              </li>
              <li>
                <Typography paragraph={true}>
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    variant="subtitle1"
                    color="primary"
                  >
                    Public stock exchange
                  </Typography>
                  A link providing evidence of substantial presence in a public
                  stock exchange.
                </Typography>
              </li>
            </ul>
            <TextField
              id="verificationLink"
              label="Enter a link"
              variant="outlined"
            />
          </FormControl>
        </Box>
        <Box sx={boxStyle}>
          <FormControl sx={{ gap: 2, marginBottom: 4 }}>
            <Typography sx={{ fontWeight: "bold" }} variant="subtitle1">
              1. Enter your official website.
            </Typography>
            <Typography paragraph={true}>
              Provide the link to an official website that references your
              organization and your wallet address.
            </Typography>
            <TextField
              id="officialWebsite"
              label="Official website"
              variant="outlined"
            />
          </FormControl>
        </Box>
        <Box sx={boxStyle}>
          <FormControl sx={{ gap: 2, marginBottom: 4 }}>
            <Typography sx={{ fontWeight: "bold" }} variant="subtitle1">
              1. Enter your official email address.
            </Typography>
            <Typography paragraph={true}>
              Provide an official email address with a domain relevant to the
              notability category you choose.
            </Typography>
            <TextField
              id="officialEmail"
              label="Official email"
              variant="outlined"
            />
          </FormControl>
        </Box>
        <Box sx={boxStyle}>
          <FormControl sx={{ gap: 2, marginBottom: 4 }}>
            <Typography sx={{ fontWeight: "bold" }} variant="subtitle1">
              1. Upload a photo of your organization&apos;s logo.
            </Typography>
            <Typography paragraph={true}>
              Provide a photo of a valid official organization-issued
              identification document, such as your school ID or company ID.
            </Typography>
            <MuiFileInput value={orgId} onChange={handleChange} />
          </FormControl>
        </Box>
      </Box>
    </Container>
  );
}
