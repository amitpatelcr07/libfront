// src/redux/authAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://libback-eh51.onrender.com/api/auth";

// REGISTER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, credentials);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("loginTime", Date.now());

      return { token, user };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, credentials);
      const { token, user } = response.data;
       console.log("Login response data:", response.data.student.name);
       console.log("Login response data1:", response.data);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("loginTime", Date.now());

      return { token, user };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Incorrect Credentials"
      );
    }
  }
);
