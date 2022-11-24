import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  useTheme,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { authSolanaUser } from "../api/UserAPI";
import { setPubkey, setUser, setVerification } from "../features/userSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AuthDialog = ({ pubkey }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(() => {
    if (pubkey) {
      if (!user) {
        authSolanaUser(pubkey).then((user) => {
          dispatch(setUser(user.user));
          dispatch(setPubkey(pubkey));
          dispatch(setVerification(user.verification));
        });
      }
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [pubkey]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullScreen={fullScreen}
      TransitionComponent={Transition}
    >
      <DialogTitle id="alert-dialog-title">
        {"Please connect your wallet!"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Choose a wallet provider to continue
        </DialogContentText>
        <WalletMultiButton sx={{ marginTop: 4 }} />
      </DialogContent>
    </Dialog>
  );
};

AuthDialog.propTypes = {
  pubkey: PropTypes.string,
};

export default AuthDialog;
