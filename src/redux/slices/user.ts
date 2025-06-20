import { get_authInfo } from "@/types/apis/auth/get_authInfo";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: {
  accessToken: string | null;
  currentUser: get_authInfo | null;
} = {
  accessToken: null,
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<get_authInfo | null>) => {
      state.currentUser = action.payload;
    },
    resetUser: (state) => {
      state.currentUser = null;
      state.accessToken = null;
    },
  },
});

export const { setAccessToken, setCurrentUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
