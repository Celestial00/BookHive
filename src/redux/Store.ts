import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { modalReducer } from "./ModalSlice";

export const store = configureStore({
  reducer: {
    userReducer,
    modalReducer,
  },
});

export type rootState = ReturnType<typeof store.getState>;
export type Appdispatch = typeof store.dispatch;
