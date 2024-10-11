import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces/User";

const initialState: User = {
  id: 0,
  firstName: "",
  lastName: "",
  role: "user",
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      const { id, firstName, lastName, role, isLoggedIn } = action.payload;
      state.id = id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.role = role;
      state.isLoggedIn = isLoggedIn;
    },
    logout: (state) => {
      return initialState;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
