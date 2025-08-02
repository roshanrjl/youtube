import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Localstorage } from "../utils/index";
import { registerUser, loginUser, logoutUser } from "../api/userApi/userapi";

//Register async thuck
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      await registerUser(credentials);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

//login async thuck
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      await loginUser(credentials);
      const { accessToken, user } = res.data;
      LocalStorage.set("accessToken", accessToken);
      LocalStorage.set("user", user);
      return { accessToken, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "login failed"
      );
    }
  }
);

//async thunk for logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (credentials, thunkAPI) => {
    try {
      await logoutUser();
      LocalStorage.clear();
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "logout failed"
      );
    }
  }
);

const initialState = {
  user: Localstorage.get("user"),
  accessToken: Localstorage.get("accessToken"),
  registered: false,
  error: null,
  isloading: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //login case
    builder
      .addCase(login.pending, (state) => {
        (state.isloading = true), (state.error = null);
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isloading = false;
        state.error = null;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload.error;
      });
    //for register case
    builder
      .addCase(register.pending, (state, action) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isloading = false;
        state.error = null;
        state.registered = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload;
      });
    //logout case
    builder
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.accessToken = null;
      })
      .addCase(logout.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload;
      });
  },
});
export default authSlice.reducer;