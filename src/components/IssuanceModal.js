import { Box, Modal, Typography } from "@mui/material";
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
        <Typography id="authModal" variant="subtitle1" component="h2">
          Issuance request sent!
        </Typography>
      </Box>
    </Modal>
  );
};

IssuanceModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default IssuanceModal;
