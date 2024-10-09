import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../interfaces/User";

const initialState: User = {
  id: 0,
  firstName: "",
  lastName: "",
  role: "user",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state = action.payload;
    },
    logout: (state) => {
      return initialState;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
