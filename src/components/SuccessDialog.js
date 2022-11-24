import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const SuccessDialog = ({ isOpen, onClose }) => (
  <Dialog
    open={isOpen}
    keepMounted
    onClose={onClose}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {"Issuance request sent!"} <CheckCircleIcon color="success" />
      </Box>
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
        Your issuance request is now being processed on the Solana blockchain.
        This can take some time. When it completes, we will send an email to
        your official email. Until then, enjoy your day!
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Ok</Button>
    </DialogActions>
  </Dialog>
);

SuccessDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default SuccessDialog;
