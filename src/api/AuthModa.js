import { Box, Modal, Typography } from "@mui/material";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import PropTypes from "prop-types";
import React from "react";

const AuthModal = ({ pubkey }) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    if (pubkey) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [pubkey]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
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
          Please choose a wallet provider to continue
        </Typography>
        <WalletMultiButton sx={{ height: 64, marginTop: 4, marginBottom: 4 }} />
      </Box>
    </Modal>
  );
};

AuthModal.propTypes = {
  pubkey: PropTypes.string,
};

export default AuthModal;
