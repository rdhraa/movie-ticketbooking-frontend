import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: null,
    isAdminAuth: false,
  },
  reducers: {
    setAdmin(state, action) {
      state.admin = action.payload;
      state.isAdminAuth= true;
    },
    clearAdmin(state) {
      state.admin = null;
      state.isAdminAuth = false;
    },
  },
});

export const { setAdmin, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;
