import { createSlice } from "@reduxjs/toolkit";

export const AUTHENTICATION_STATUS = {
  AUTHENTICATED: "AUTHENTICATED",
  NOT_AUTHENTICATED: "NOT_AUTHENTICATED",
  LOADING: "LOADING",
};

const initialState = {
  authenticationStatus: AUTHENTICATION_STATUS.LOADING,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticationStatus: (state, action) => {
      state.authenticationStatus = action.payload;
    },
    setAuthenticatedUser: (state, action) => {
      state.user = {
        ...action.payload,
        avatar: {
          fallback: action.payload.name.slice(0, 2),
          src: action.payload.avatar_url,
        },
      };
    },
    resetAuthenticatedUser: (state) => {
      state.authenticationStatus = AUTHENTICATION_STATUS.NOT_AUTHENTICATED;
      state.user = null;
    },
    updateUser: () => {},
  },
});

export const {
  setAuthenticatedUser,
  setAuthenticationStatus,
  resetAuthenticatedUser,
} = authSlice.actions;

export default authSlice.reducer;
