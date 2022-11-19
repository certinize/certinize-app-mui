/* eslint-disable no-unused-vars */
import SendIcon from "@mui/icons-material/Send";
import { Box, Button, List, ListItem, Paper, Typography } from "@mui/material";
import { Divider } from "@mui/material";
import { Image as MaterialImg } from "mui-image";
import PropTypes from "prop-types";
import React from "react";

const CertificatePreview = ({
  issuanceDate,
  recipients,
  certTemplate,
  certMeta,
}) => {
  React.useEffect(() => {}, [certMeta]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 10,
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
          <Typography variant="h5">Recipients</Typography>
          <Paper
            sx={{
              maxHeight: 200,
              overflow: "auto",
              display: recipients ? "none" : "block",
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Typography variant="h5">Certificate Layout</Typography>
          <MaterialImg height={400} src={certMeta?.certDataUrl} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Typography variant="h5">Issuance Date</Typography>
          <Typography>{issuanceDate}</Typography>
        </Box>
      </Box>
      <Button variant="contained" startIcon={<SendIcon />}>
        Issue Certificate
      </Button>
    </Box>
  );
};

CertificatePreview.propTypes = {
  issuanceDate: PropTypes.string.isRequired,
  recipients: PropTypes.array.isRequired,
  certTemplate: PropTypes.object.isRequired,
  certMeta: PropTypes.object.isRequired,
};

export default CertificatePreview;
