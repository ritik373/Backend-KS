import { createSlice } from "@reduxjs/toolkit";
const initialGroupId = localStorage.getItem("groupId");
const initialGroupName = localStorage.getItem("groupname");
const initialIsAdmin = localStorage.getItem("isAdmin");
const convertToBooleanIsAdmin = initialIsAdmin === "true";
const initialMessageState = {
  messages: [],
  groups: [],
  groupId: initialGroupId,
  groupname: initialGroupName,
  searchresult: [],
  isAdmin: convertToBooleanIsAdmin,
  groupmembers: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState: initialMessageState,
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },
    setGroups(state, action) {
      state.groups = action.payload;
      localStorage.setItem("groups", JSON.stringify(action.payload));
    },
    setGroupId(state, action) {
      state.groupId = action.payload;
      localStorage.setItem("groupId", action.payload);
    },
    setGroupName(state, action) {
      state.groupname = action.payload;
      localStorage.setItem("groupname", action.payload);
    },
    setSearchResult(state, action) {
      state.searchresult = action.payload;
      localStorage.setItem("searchresult", action.payload);
    },
    setIsadmin(state, action) {
      state.isAdmin = action.payload;
      localStorage.setItem("isAdmin", action.payload);
    },
    setGroupMembers(state, action) {
      state.groupmembers = action.payload;
    },
  },
});

export const messageActions = messageSlice.actions;
export default messageSlice.reducer;
