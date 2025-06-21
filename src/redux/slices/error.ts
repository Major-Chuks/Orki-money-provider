import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ErrorState = {
  code: number;
  message: string;
  label: string;
};

const initialState: ErrorState = {
  code: -1,
  message: "",
  label: "",
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<ErrorState>) => {
      state.code = action.payload.code;
      state.message = action.payload.message;
      state.label = action.payload.label;
    },
    clearError: (state) => {
      state.code = initialState.code;
      state.message = initialState.message;
      state.label = initialState.label;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;
