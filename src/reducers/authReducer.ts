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
      const { id, firstName, lastName, role } = action.payload;
      state.id = id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.role = role;
    },
    logout: (state) => {
      return initialState;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
