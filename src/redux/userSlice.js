import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "./Api";

export const loadUsers = createAsyncThunk("users", async () => {
  const users = await Api.loadAllUsers();
  return users;
});

export const thunkSlice = createSlice({
  name: "api-call-actions",
  initialState: {
    loading: false,
    data: [],
    errors: "",
  },
  reducers: {},
  extraReducers: {
    [loadUsers.pending.type]: (state) => {
      state.loading = true;
      state.errors = "";
    },
    [loadUsers.fulfilled.type]: (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
      state.errors = "";
    },
    [loadUsers.rejected.type]: (state, action) => {
      state.data = [];
      state.loading = false;
      state.errors = action.error.message;
    },
  },
});

export default thunkSlice.reducer;
