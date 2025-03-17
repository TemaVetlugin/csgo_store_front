import { createSlice } from "@reduxjs/toolkit";
import { currencies } from "@/lib/constants/currencies";

const initialState = {
  selectedPageHref: "/",
  selectedProfileTab: "user-info",
  selectedCurrency: currencies[1],
};

export const main = createSlice({
  name: "main",
  initialState,
  reducers: {
    reset: () => initialState,
    setSelectedPageHref: (state, action) => {
      state.selectedPageHref = action.payload;
    },
    setSelectedProfileTab: (state, action) => {
      localStorage.setItem("selectedProfileTab", action.payload);
      state.selectedProfileTab = action.payload;
    },
    setSelectedCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
  },
});

export const {
  reset,
  setSelectedPageHref,
  setSelectedProfileTab,
  setSelectedCurrency,
} = main.actions;

export default main.reducer;
