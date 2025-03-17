import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartProduct: (state, action) => {
      const cartItems = [...state.cartItems, action.payload];

      state.cartItems = cartItems;
      localStorage.setItem("cart_data", JSON.stringify(cartItems));
    },
    removeCartItem: (state, action) => {
      const cartItems = state.cartItems.filter((i) => i.id !== action.payload);

      state.cartItems = cartItems;
      localStorage.setItem("cart_data", JSON.stringify(cartItems));
    },
    setTotalAmount: (state) => {
      const amount = state.cartItems.reduce(
        (acc, cur) => (acc += Number(cur.price)),
        0
      );

      state.totalAmount = amount.toFixed(2);
      localStorage.setItem("cart_data_total_amount", amount.toFixed(2));
    },
    resetCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;

      localStorage.removeItem("cart_data");
      localStorage.removeItem("cart_data_total_amount");
    },
    setCartDataFromLS: (state) => {
      state.cartItems = JSON.parse(localStorage.getItem("cart_data")) || [];
      state.totalAmount =
        Number(localStorage.getItem("cart_data_total_amount")) || 0;
    },
  },
});

export const {
  addCartProduct,
  removeCartItem,
  setTotalAmount,
  resetCart,
  setCartDataFromLS,
} = cartSlice.actions;

export default cartSlice.reducer;
