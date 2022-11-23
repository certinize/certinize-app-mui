import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { Box, Divider, Modal, Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const unverifiedAlt =
  "This organization's profile is currently being reviewed. In the meantime, you can go over their website and email to verify their authenticity.";

const VerificationModal = ({ isOpen, onClose, issuerInfo }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="auth-modal"
      aria-describedby="auth-user-modal"
    >
      <Box sx={style}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Typography id="authModal" variant="h2">
              {issuerInfo.verified_on ? "Verified" : "Not Verified"}
            </Typography>
            {issuerInfo.approved ? (
              <CheckCircleIcon color="success" sx={{ fontSize: 64 }} />
            ) : (
              <ErrorIcon color="error" sx={{ fontSize: 64 }} />
            )}
          </Box>

          <Divider />
          <Box>
            <Typography paragraph={true}>
              {issuerInfo.verified_on
                ? `Verified on: ${issuerInfo.verified_on}`
                : unverifiedAlt}
            </Typography>
            <Typography id="authModal" variant="subtitle1">
              <b>Name: </b>
              {issuerInfo.name}
            </Typography>
            <Typography id="authModal" variant="subtitle1">
              <b>Website: </b>
              <a href="issuerInfo.official_website" target="_blank">
                {issuerInfo.official_website}
              </a>
            </Typography>
            <Typography id="authModal" variant="subtitle1">
              <b>Email: </b>
              <a href={"mailto: " + issuerInfo.official_email}>
                {issuerInfo.official_email}
              </a>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

VerificationModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  issuerInfo: PropTypes.object,
};

export default VerificationModal;
