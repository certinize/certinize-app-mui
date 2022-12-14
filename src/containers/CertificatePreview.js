/* eslint-disable no-unused-vars */
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { Box, List, ListItem, Paper, Typography } from "@mui/material";
import { Divider } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { Image as MaterialImg } from "mui-image";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import { generateCert, getCert } from "../api/CertificateAPI";
import { createTemplateConfig } from "../api/ConfigurationAPI";
import { getUnsignedMessage, makeIssuanceRequest } from "../api/IssuanceAPI";
import { createTemplate } from "../api/TemplateAPI";
import IssuanceDialog from "../components/IssuanceDialog";
import SuccessDialog from "../components/SuccessDialog";

const defaultIssuerEmail = "certinize@gmail.com";

const CertificatePreview = ({
  recipients,
  certTemplate,
  certMeta,
  eventTitle,
}) => {
  const user = useSelector((state) => state.user.user);
  const { publicKey, signMessage } = useWallet();
  const [loading, setLoading] = React.useState(false);
  const [issuanceModalOpen, setIssuanceModalOpen] = React.useState(false);
  const [successModalOpen, setSuccessModalOpen] = React.useState(false);

  const validateFields = () => {
    if (!user.email) {
      alert("Please verify your email first!");
      window.location.href = "/verification-request";
    }

    if (!recipients || !certTemplate || !certMeta || !eventTitle) {
      alert("Please fill in all the fields!");
      window.location.href = "/issuance";
    }
  };

  const handleIssuance = async () => {
    validateFields();
    setLoading(true);
    const pubkey = publicKey.toBase58();
    const unsignedMessage = await getUnsignedMessage(publicKey);

    if (unsignedMessage?.status_code == 400) {
      alert(unsignedMessage.detail);
      setLoading(false);
      return;
    }

    const signature = await signMessage(
      new TextEncoder().encode(unsignedMessage.message)
    );

    setIssuanceModalOpen(true);

    const base64 = await certTemplateBase64(certTemplate);
    const templates = await saveTemplate(base64);
    const templateConfig = await saveTemplateConfig(certMeta, templates);
    const certificate = await createCertificate(templateConfig, recipients);

    const issuanceRequest = {
      request_id: unsignedMessage.request_id,
      signature: bs58.encode(signature),
      event_title: eventTitle,
      issuer_meta: {
        issuer_name: user.name || pubkey,
        issuer_email: user.email || defaultIssuerEmail,
        issuer_website: user.website,
        issuer_pubkey: pubkey,
      },
      recipient_meta: recipients.map((recipient) => {
        return {
          recipient_name: recipient.name,
          recipient_email: recipient.email,
          recipient_pubkey: recipient.wallet,
          recipient_ecert_url: certificate.certificate.certificate.find(
            (cert) => cert.recipient_name === recipient.name
          ).certificate_url,
        };
      }),
    };

    await makeIssuanceRequest(issuanceRequest);
    setLoading(false);
    setIssuanceModalOpen(false);
    setSuccessModalOpen(true);
  };

  return (
    <>
      <IssuanceDialog
        isOpen={issuanceModalOpen}
        onClose={() => setIssuanceModalOpen(false)}
      />
      <SuccessDialog
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 20,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 10,
            marginTop: 10,
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Typography variant="overline" color="secondary">
              Recipients
            </Typography>
            <Paper
              sx={{
                maxHeight: 200,
                overflow: "auto",
                display: recipients.length === 0 ? "none" : "block",
              }}
            >
              <List>
                {recipients?.map((recipient) => (
                  <ListItem key={recipient.wallet}>
                    <Typography>{recipient.name}</Typography>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Typography variant="overline" color="secondary">
              Certificate Layout
            </Typography>
            <MaterialImg height={400} src={certMeta?.certDataUrl || ""} />
          </Box>
        </Box>
        <LoadingButton
          loading={loading}
          onClick={handleIssuance}
          variant="contained"
          startIcon={<SendIcon />}
          sx={{
            height: 64,
          }}
        >
          Issue Certificate
        </LoadingButton>
      </Box>
    </>
  );
};

CertificatePreview.propTypes = {
  recipients: PropTypes.array.isRequired,
  certTemplate: PropTypes.string.isRequired,
  certMeta: PropTypes.object.isRequired,
  eventTitle: PropTypes.string.isRequired,
};

async function createCertificate(templateConfig, recipients) {
  const generateCertReqBody = {
    template_config_id: templateConfig.template_config_id,
    recipients: recipients.map((recipient) => {
      return {
        recipient_name: recipient.name,
      };
    }),
  };

  const generateCertReq = await generateCert(generateCertReqBody);
  var cert = await getCert(generateCertReq.request_id);

  while (cert.code) {
    await new Promise((r) => setTimeout(r, 1000));
    cert = await getCert(generateCertReq.request_id);
  }

  return cert;
}

async function saveTemplateConfig(certMeta, templates) {
  const createTemplateConfReqBody = {
    recipient_name_meta: {
      position: {
        x: certMeta.namePosition.x,
        y: certMeta.namePosition.y,
      },
      font_size: certMeta.fontSize,
      font_url: certMeta.fontStyle,
      template_height: certMeta.templateHeight,
    },
    template_id: templates.templates[0]?.template_id,
    template_config_name: Math.random().toString(36).substring(2, 15),
  };

  const templateConfig = await createTemplateConfig(createTemplateConfReqBody);
  return templateConfig;
}

async function saveTemplate(base64) {
  const addCertTemplateReqBody = {
    templates: [base64.replace(/^data:image\/[a-z]+;base64,/, "")],
  };

  const templates = await createTemplate(addCertTemplateReqBody);
  return templates;
}

async function certTemplateBase64(certTemplate) {
  const img = await fetch(certTemplate).then((r) => r.blob());
  const base64 = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
  return base64;
}

export default CertificatePreview;
