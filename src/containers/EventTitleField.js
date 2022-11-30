import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import React from "react";

const EventTitleField = ({ eventTitle, setEventTitle }) => {
  return (
    <Box>
      <TextField
        id="outlined-basic"
        label="Event Title"
        variant="outlined"
        sx={{ width: "50%" }}
        required={true}
        value={eventTitle}
        onChange={(e) => setEventTitle(e.target.value)}
      />
    </Box>
  );
};

EventTitleField.propTypes = {
  eventTitle: PropTypes.string.isRequired,
  setEventTitle: PropTypes.func.isRequired,
};

export default EventTitleField;
