import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/ui";
import socketReducer from "./slices/socket";
import userReducer from "./slices/user";
import chatReducer from "./slices/chat";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    socket: socketReducer,
    user: userReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
