import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const IssuanceDialog = ({ isOpen, onClose }) => {
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Issuing certificate..."}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          We are currently processing your request. Please wait a few moments
          before refreshing or closing the page.
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

IssuanceDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default IssuanceDialog;
