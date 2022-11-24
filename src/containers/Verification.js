import { LoadingButton } from "@mui/lab";
import { TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import Image from "mui-image";
import React from "react";

import { getUserVerificationStatus } from "../api/UserAPI";
import VerificationDialog from "../components/VerificationDialog";

const Verification = () => {
  const [openModal, setModalOpen] = React.useState(false);
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [issuerPubkey, setIssuerPubkey] = React.useState("");
  const [issuerInfo, setIssuerInfo] = React.useState({
    official_website: "",
    approved: false,
    official_email: "",
    pubkey: "",
    verified_on: null,
  });

  const verifyIssuer = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    const info = await getUserVerificationStatus(issuerPubkey);
    console.log(info);
    setIssuerInfo(info);
    setModalOpen(true);
    setBtnLoading(false);
  };

  return (
    <>
      <VerificationDialog
        isOpen={openModal}
        onClose={() => setModalOpen(false)}
        issuerInfo={issuerInfo}
      />
      <Container sx={{ height: "100vh" }}>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 4,
          }}
        >
          <Box
            sx={{
              margin: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              src="https://raw.githubusercontent.com/certinize/assets/main/images/certinize-logo.svg"
              height={200}
              width={200}
            />
            <Typography variant="h4" component="h1">
              Certinize
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h5"
              sx={{ marginBottom: 2, alignSelf: "flex-start" }}
            >
              <b>Verification</b> means to confirm if a wallet address used to
              issue a certificate actually belongs to an organization or issuing
              body.
            </Typography>
            <Typography
              variant="h5"
              sx={{ marginBottom: 2, alignSelf: "flex-start" }}
            >
              You can still verify an issuing body through other means, but the
              process will likely be more tedious. If you need to verify the
              authenticity of a certificate, you can do so through a blockchain
              explorer, like{" "}
              <a href="https://solscan.io/" target="_blank" rel="noreferrer">
                Solscan
              </a>
              .
            </Typography>
          </Box>

          <form
            onSubmit={verifyIssuer}
            style={{
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="Enter issuer wallet address or public key"
                variant="filled"
                onChange={(e) => setIssuerPubkey(e.target.value)}
                required={true}
              />
              <LoadingButton
                sx={{ height: 64, marginRight: "auto" }}
                variant="contained"
                loadingPosition="center"
                loading={btnLoading}
                type="submit"
              >
                Verify
              </LoadingButton>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};
export default Verification;
