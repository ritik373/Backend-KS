import { createSlice } from "@reduxjs/toolkit";
const initialToken = localStorage.getItem("token");
const initialName = localStorage.getItem("name");
const intialId = localStorage.getItem("userid");
const userIsLoggedIn = !!initialToken;

const initialAuthState = {
  token: initialToken,
  isLoggedIn: userIsLoggedIn,
  name: initialName,
  userId: intialId,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      state.isLoggedIn = true;
      state.name = action.payload.name;
      localStorage.setItem("name", action.payload.name);
      state.userId = action.payload.userId;
      localStorage.setItem("userid", action.payload.userId);
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("userid");
      localStorage.removeItem("url");
      localStorage.removeItem("messages");
      localStorage.removeItem("groups");
      localStorage.removeItem("groupId");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
