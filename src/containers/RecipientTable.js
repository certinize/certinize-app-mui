import AddIcon from "@mui/icons-material/Add";
import { Box, Button, FormControl, FormGroup, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { PublicKey } from "@solana/web3.js";
import PropTypes from "prop-types";
import React from "react";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const RecipientTable = ({ recipients, setRecipients }) => {
  const [recipient, setRecipient] = React.useState({
    name: "",
    wallet: "",
    email: "",
  });
  const [error, setError] = React.useState({
    name: false,
    wallet: false,
    email: false,
  });

  const addRow = () => {
    if (recipient.name && recipient.wallet && recipient.email) {
      try {
        if (!PublicKey.isOnCurve(new PublicKey(recipient.wallet)))
          throw new Error();
      } catch (error) {
        setError({ ...error, wallet: true });

        return;
      }

      if (!emailRegex.test(recipient.email)) {
        setError({ ...error, email: true });

        return;
      }

      setRecipients([...recipients, recipient]);
      setRecipient({ name: "", wallet: "", email: "" });
      setError({ name: false, wallet: false, email: false });
    } else {
      setError({
        name: !recipient.name,
        wallet: !recipient.wallet,
        email: !recipient.email,
      });
    }
  };

  return (
    <Box sx={{ marginTop: 10 }}>
      <FormGroup
        sx={{
          flexDirection: "row",
          gap: 2,
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <FormControl>
          <TextField
            id="recipientName"
            type="text"
            label="Recipient Name"
            variant="standard"
            value={recipient.name}
            onChange={(e) =>
              setRecipient({ ...recipient, name: e.target.value })
            }
            error={error.name}
            helperText={error.name ? "Please enter the recipient's name" : ""}
            required
          />
        </FormControl>
        <FormControl>
          <TextField
            id="recipientWalletAddress"
            type="text"
            label="Recipient Wallet Address"
            variant="standard"
            value={recipient.wallet}
            onChange={(e) =>
              setRecipient({ ...recipient, wallet: e.target.value })
            }
            error={error.wallet}
            helperText={error.wallet ? "Invalid wallet address" : ""}
            required
          />
        </FormControl>
        <FormControl>
          <TextField
            id="recipientEmail"
            type="email"
            label="Recipient Email"
            variant="standard"
            value={recipient.email}
            onChange={(e) =>
              setRecipient({ ...recipient, email: e.target.value })
            }
            error={error.email}
            helperText={error.email ? "Invalid email address" : ""}
            required
          />
        </FormControl>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addRow}
          color="primary"
          sx={{ height: 64 }}
        >
          Add
        </Button>
      </FormGroup>
      <TableContainer sx={{ maxHeight: 600 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Wallet Address</TableCell>
              <TableCell align="left">Email Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipients?.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.wallet}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

RecipientTable.propTypes = {
  recipients: PropTypes.array.isRequired,
  setRecipients: PropTypes.func.isRequired,
};

export default RecipientTable;
