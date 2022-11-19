import { createSlice } from "@reduxjs/toolkit";

// The recipients state is a list of objects with the following properties:
// - recipient_email: the email address of the recipient
// - recipient_name: the name of the recipient
// - recipient_pubkey: the public key of the recipient
// - recipient_ecert_url: the URL of the recipient's eCert
export const issuanceSlice = createSlice({
  name: "issuance",
  initialState: {
    recipients: [],
    issuanceDate: "",
  },
  reducers: {
    addRecipient: (state, action) => {
      state.recipients.push(action.payload);
    },
    setIssuanceDate: (state, action) => {
      state.issuanceDate = action.payload;
    },
    overwriteRecipients: (state, action) => {
      state.recipients = action.payload;
    },
    resetIssuance: (state) => {
      state.recipients = [];
      state.issuanceDate = "";
    },
  },
});

export const {
  addRecipient,
  setIssuanceDate,
  resetIssuance,
  overwriteRecipients,
} = issuanceSlice.actions;

export default issuanceSlice.reducer;
