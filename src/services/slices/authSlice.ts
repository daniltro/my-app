// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../api/api";
import { IAuthState, IUserData } from "../../types/types";

export const login = createAsyncThunk(
  "auth/login",
  async (userData: IUserData) => {
    const token = await loginApi(userData);
    return token;
  }
);

const initialState: IAuthState = {
  token: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
