import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Divider, Modal, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const SuccessModal = ({ isOpen, onClose }) => (
  <Modal
    open={isOpen}
    onClose={onClose}
    aria-labelledby="auth-modal"
    aria-describedby="auth-user-modal"
  >
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Typography id="authModal" variant="h4">
            Issuance request sent!
          </Typography>
          <CheckCircleIcon color="success" sx={{ fontSize: 64 }} />
        </Box>

        <Divider />
        <Typography variant="subtitle1">
          Your issuance request is now being processed on the Solana blockchain.
          This can take some time. When it completes, we will send an email to
          your official email. Until then, enjoy your day!
        </Typography>
      </Box>
    </Box>
  </Modal>
);

SuccessModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default SuccessModal;
