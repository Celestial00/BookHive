import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userObj: object | null;
  Name: string;
  Email: string;
  Token: string;
}

const initialState: UserState = {
  userObj: null,
  Name: "",
  Email: "",
  Token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<any>) => {
      state.userObj = action.payload;
      state.Name = action.payload?.displayName;
      state.Email = action.payload?.email || "";
      state.Token = action.payload?.accessToken || "";
    },

    logOut: (state) => {
      state.userObj = null;
      state.Email = "";
      state.Token = "";
    },
  },
});

export const { logIn, logOut } = userSlice.actions;
export const userReducer = userSlice.reducer;
