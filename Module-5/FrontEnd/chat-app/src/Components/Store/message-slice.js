import { createSlice } from "@reduxjs/toolkit";

const initialMessageState = {
  messages: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState: initialMessageState,
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },
  },
});

export const messageActions = messageSlice.actions;
export default messageSlice.reducer;
