import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chat: null,
};

const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action) => {
      state.chat = action.payload;
    },
  },
});

export const { setChat } = ChatSlice.actions;
export default ChatSlice.reducer;
