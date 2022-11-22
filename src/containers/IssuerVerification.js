/* eslint-disable no-unused-vars */
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Divider,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import Container from "@mui/material/Container";
import { MuiFileInput } from "mui-file-input";
import React from "react";

import { verifyUser } from "../api/UserAPI";

const boxStyle = {
  marginTop: 4,
  bgcolor: "#F9F9F9",
  borderRadius: 4,
  boxShadow:
    "rgb(60 66 87 / 20%) 0rem 0.4375rem 0.875rem 0rem, rgb(0 0 0 / 50%) 0rem 0.1875rem 0.375rem 0rem",
  width: 600,
  padding: 4,
};

export default function IssuerVerification() {
  const [loading, setLoading] = React.useState(false);
  const [verifyReq, setVerifyReq] = React.useState({
    pubkey: "",
    info_link: "",
    official_website: "",
    official_email: "",
    organization_id: "",
    approved: "",
  });
  const [orgId, setOrgId] = React.useState(null);
  const handleChange = (e) => setOrgId(e);

  const handleSubmit = async () => {
    setLoading(true);
    console.log(verifyReq);
  };

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
            textAlign: "center",
          }}
        >
          <Typography variant="h4" color="primary" sx={{ fontWeight: "bold" }}>
            Get Verified!
          </Typography>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <Typography paragraph={true} sx={{ textAlign: "justify" }}>
            <b>
              With Certinize, people do not have to verify certificates. They
              only need to validate the issuing body, your organization.
            </b>{" "}
            It means to find out if a wallet address used to issue a certificate
            belongs to an organization.
          </Typography>
          <Typography paragraph={true} sx={{ textAlign: "justify" }}>
            The verification process is optional. People can still verify an
            issuing body themselves using other means. You don&apos;t have to
            provide us with your organization&apos;s information, but it will
            help people authenticate an issuing body more quickly. If you are
            familiar with Twitter&apos;s verified badge, this process implements
            the same concept.
          </Typography>
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
              onChange={(e) =>
                setVerifyReq({ ...verifyReq, pubkey: e.target.value })
              }
              sx={{ maxWidth: "70%" }}
            />
          </FormControl>
        </Box>
        <Box sx={boxStyle}>
          <FormControl sx={{ gap: 2, marginBottom: 4 }}>
            <Typography sx={{ fontWeight: "bold" }} variant="subtitle1">
              2. Provide a link we can use to verify your organization&apos;s
              identity and credibility.
            </Typography>
            <Typography>
              <i>Any of the following will work:</i>
            </Typography>
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
              onChange={(e) =>
                setVerifyReq({ ...verifyReq, info_link: e.target.value })
              }
              sx={{ maxWidth: "70%" }}
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
              onChange={(e) =>
                setVerifyReq({ ...verifyReq, official_website: e.target.value })
              }
              sx={{ maxWidth: "70%" }}
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
              onChange={(e) =>
                setVerifyReq({ ...verifyReq, official_email: e.target.value })
              }
              sx={{ maxWidth: "70%" }}
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
            <MuiFileInput
              value={orgId}
              onChange={handleChange}
              sx={{ maxWidth: "70%", marginRight: "auto" }}
              placeholder="Choose a file"
            />
          </FormControl>
        </Box>
        <LoadingButton
          loading={loading}
          onClick={handleSubmit}
          variant="contained"
          sx={{ height: 64, marginTop: 4 }}
        >
          Submit
        </LoadingButton>
      </Box>
    </Container>
  );
}
