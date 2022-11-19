import { configureStore } from "@reduxjs/toolkit";

import issuanceReducer from "../features/issuanceSlice";
import templateReducer from "../features/templateSlice";
import userReducer from "../features/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    issuance: issuanceReducer,
    template: templateReducer,
  },
});

export default store;
