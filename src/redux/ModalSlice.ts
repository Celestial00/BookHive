import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,

  reducers: {
    ToggleModal: (state, action: PayloadAction) => {
      state.modalOpen = !state.modalOpen;
    },
  },
});

export const { ToggleModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
