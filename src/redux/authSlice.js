// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authAction";

// Safely read JSON from localStorage
function safeJSONParse(key) {
  try {
    const value = localStorage.getItem(key);

    // if key does not exist
    if (!value) return null;

    // if value is literally "undefined" or "" or "null"
    if (value === "undefined" || value === "null" || value === "") {
      localStorage.removeItem(key);
      return null;
    }

    return JSON.parse(value);
  } catch (error) {
    // If JSON.parse crashes → clean corrupted value
    localStorage.removeItem(key);
    return null;
  }
}

const initialState = {
  user: safeJSONParse("user"),
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("loginTime");
    },
  },

  extraReducers: (builder) => {
    builder
      // LOGIN -----------
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        // Store fresh valid data
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REGISTER -----------
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        // Store fresh valid data
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
