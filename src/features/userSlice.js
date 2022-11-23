import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    pubkey: null,
    user: null,
    verification: {},
  },
  reducers: {
    setPubkey: (state, action) => {
      state.pubkey = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setVerification: (state, action) => {
      state.verification = action.payload;
    },
    logout: (state) => {
      state.pubkey = null;
      state.user = null;
      state.verification = {};
    },
  },
});

export const { setPubkey, setUser, setVerification, logout } =
  userSlice.actions;

export default userSlice.reducer;
