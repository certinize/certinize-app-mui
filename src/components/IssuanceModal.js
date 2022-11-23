import { Box, Divider, Modal, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const IssuanceModal = ({ isOpen, onClose }) => {
  return (
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
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h4">Issuing certificate...</Typography>
          <Divider />
          <Typography variant="subtitle1">
            We are currently processing your request. Please wait a few moments
            before refreshing or closing the page.
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

IssuanceModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default IssuanceModal;
