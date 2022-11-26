/* eslint-disable no-unused-vars */
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Paper,
  Slide,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { Stack } from "@mui/system";
import Image from "mui-image";
import React from "react";
import { useParams } from "react-router-dom";

import { getUserVerificationStatus } from "../api/UserAPI";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

const CertVerification = () => {
  const { tokenAddress } = useParams();
  const [openModal, setModalOpen] = React.useState(false);
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [certTokenAddress, setCertTokenAddress] = React.useState("");
  const [errMessage, setErrMessage] = React.useState({
    message: "",
    cause: "",
  });
  const [errModal, setErrModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState({
    contentText: "",
    recipientName: "",
    issuerName: "",
    issuerPubkey: "",
    issuerWebsite: "",
    issuerEmail: "",
    verifiedOn: "",
  });

  const verifyCertificate = async (tokenAddress) => {
    setLoading(true);

    const jsonData = await fetch(
      `https://api.solscan.io/account?address=${
        tokenAddress || certTokenAddress
      }&cluster=devnet`
    );

    const data = await jsonData.json();

    if (data.code === -32602) {
      setErrMessage({
        message:
          "Please check the certificate again. Invalid Certificate Token Address:",
        cause: tokenAddress,
      });
      setModalOpen(false);
      setErrModal(true);
    } else {
      var nftMetadata_ = null;

      try {
        nftMetadata_ = await fetch(data.data.metadata.data.uri);
      } catch (err) {
        setErrMessage({
          message:
            "Please check the certificate again. Invalid Certificate Token Address:",
          cause: tokenAddress,
        });
        setModalOpen(false);
        setErrModal(true);
        setLoading(false);
        return;
      }

      const nftMetadata = await nftMetadata_.json();

      const issuerInfo = await getUserVerificationStatus(
        data.data.metadata.updateAuthority
      );

      if (issuerInfo.status_code || !issuerInfo.approved) {
        setErrMessage({
          message:
            "This certificate was not issued by a verified issuing body. Please check the certificate again.",
        });
        setErrModal(true);
      } else {
        setDialogContent({
          contentText:
            "This certificate was issued by a verified issuing body.",
          recipientName: nftMetadata.attributes.find(
            (attr) => attr.trait_type === "recipient name"
          ).value,
          issuerName: issuerInfo.name,
          issuerPubkey: data.data.metadata.updateAuthority,
          issuerWebsite: issuerInfo.official_website,
          issuerEmail: issuerInfo.official_email,
          verifiedOn: issuerInfo.verified_on,
        });
        setModalOpen(true);
      }
    }

    setLoading(false);
  };

  const verifyCert = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    await verifyCertificate(certTokenAddress);
    setBtnLoading(false);
  };

  React.useEffect(() => {
    const verify = async () => {
      setCertTokenAddress(tokenAddress);
      await verifyCertificate(tokenAddress);
    };

    if (tokenAddress) {
      verify();
    }

    return () => {};
  }, [tokenAddress]);

  return (
    <>
      {loading && (
        <Box
          sx={{
            position: "fixed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            right: 0,
            bottom: 0,
            top: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "-webkit-tap-highlight-color": "transparent",
            zIndex: -1,
          }}
        >
          <CircularProgress size={64} />
        </Box>
      )}
      <Dialog
        open={errModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setErrModal(false)}
        aria-describedby="error-dialog-slide"
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Error: Invalid Certificate
          <ErrorIcon color="error" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {errMessage.message} <b>{errMessage.cause}</b>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModalOpen(false)}
        aria-describedby="alert-dialog-slide"
        maxWidth="md"
      >
        <DialogTitle>
          Certificate Token Address: <b>{certTokenAddress}</b>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            {dialogContent?.contentText}
            <CheckCircleIcon color="success" />
          </DialogContentText>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <Box>
            <Typography variant="overline">Recipient Information</Typography>
            <Stack>
              <Item>
                <Typography variant="h6">Recipient Name</Typography>
                <Typography variant="body1">
                  {dialogContent?.recipientName}
                </Typography>
              </Item>
            </Stack>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
            <Typography variant="overline">Issuer Information</Typography>
            <Stack>
              <Item>
                <Typography variant="h6">Isser Name</Typography>
                <Typography variant="body1">
                  {dialogContent?.issuerName}
                </Typography>
              </Item>
              <Item>
                <Typography variant="h6">Issuer Public Key</Typography>
                <Typography variant="body1">
                  {dialogContent?.issuerPubkey}
                </Typography>
              </Item>
              <Item>
                <Typography variant="h6">Isser Website</Typography>
                <Typography variant="body1">
                  {dialogContent?.issuerWebsite}
                </Typography>
              </Item>
              <Item>
                <Typography variant="h6">Isser Email</Typography>
                <Typography variant="body1">
                  {dialogContent?.issuerEmail}
                </Typography>
              </Item>
              <Item>
                <Typography variant="h6">Isser Verified On</Typography>
                <Typography variant="body1">
                  {dialogContent?.verifiedOn}
                </Typography>
              </Item>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
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
          <form
            onSubmit={verifyCert}
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
                label="Enter a certificate token address"
                variant="filled"
                required={true}
                onChange={(e) => setCertTokenAddress(e.target.value)}
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

export default CertVerification;
