import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chat: null,
  chats: [],
};

const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action) => {
      state.chat = action.payload;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
  },
});

export const { setChat, setChats } = ChatSlice.actions;
export default ChatSlice.reducer;
