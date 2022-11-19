import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PropTypes } from "prop-types";
import React from "react";

const DateSelection = ({ issuanceDate, setIssuanceDate }) => {
  return (
    <Box>
      <Typography>
        Adding a date to your certificate can help you and your recipients keep
        track of when the certificate was earned or presented.
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Issuance Date"
            inputFormat="YYYY/MM/DD"
            value={issuanceDate}
            onChange={(e) =>
              setIssuanceDate(
                new Date(e).toISOString().split("T")[0].replace(/-/g, "/")
              )
            }
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  );
};

DateSelection.propTypes = {
  issuanceDate: PropTypes.any.isRequired,
  setIssuanceDate: PropTypes.func.isRequired,
};

export default DateSelection;
