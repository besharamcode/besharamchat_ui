import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = !state.loading;
    },
  },
});

export const { setLoading } = uiSlice.actions;

export default uiSlice.reducer;
