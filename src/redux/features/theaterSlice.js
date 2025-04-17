import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theaterData: {},
  isTheaterAuth: false,
};

export const theaterSlice = createSlice({
  name: "theater",
  initialState,
  reducers: {
    saveTheater: (state, action) => {
      state.isTheaterAuth = true;
      state.theaterData = action.payload;
    },
    clearTheater: (state) => {
      state.isTheaterAuth = false;
      state.theaterData = {};
    },
  },
});

export const { saveTheater, clearTheater } = theaterSlice.actions;

export default theaterSlice.reducer;
