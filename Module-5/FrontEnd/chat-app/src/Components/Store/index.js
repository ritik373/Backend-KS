import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth-slice";
import messageReducer from "./message-slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
  },
});
export default store;
