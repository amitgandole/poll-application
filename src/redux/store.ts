import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../pages/Login/authReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
