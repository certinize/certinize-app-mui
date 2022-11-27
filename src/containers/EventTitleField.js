import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const EventTitleField = () => {
  return (
    <Box>
      <TextField
        id="outlined-basic"
        label="Event Title"
        variant="outlined"
        sx={{ width: "50%" }}
        required={true}
      />
    </Box>
  );
};

export default EventTitleField;
