import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import { PropTypes } from "prop-types";
import React from "react";

const unverifiedAlt =
  "This organization's profile is currently being reviewed. In the meantime, you can go over their website and email to verify their authenticity yourself.";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VerificationDialog = ({ isOpen, onClose, issuerInfo }) => {
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {issuerInfo.verified_on ? "Verified" : "Not Verified"}
          {issuerInfo.approved ? (
            <CheckCircleIcon color="success" />
          ) : (
            <ErrorIcon color="error" />
          )}
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <Box>
          <Typography paragraph={true}>
            {issuerInfo.verified_on
              ? `Verified on: ${issuerInfo.verified_on}`
              : unverifiedAlt}
          </Typography>
          <Typography id="AuthDialog" variant="subtitle1">
            <b>Name: </b>
            {issuerInfo.name}
          </Typography>
          <Typography id="AuthDialog" variant="subtitle1">
            <b>Website: </b>
            <a href="issuerInfo.official_website" target="_blank">
              {issuerInfo.official_website}
            </a>
          </Typography>
          <Typography id="AuthDialog" variant="subtitle1">
            <b>Email: </b>
            <a href={"mailto: " + issuerInfo.official_email}>
              {issuerInfo.official_email}
            </a>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

VerificationDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  issuerInfo: PropTypes.object,
};

export default VerificationDialog;
