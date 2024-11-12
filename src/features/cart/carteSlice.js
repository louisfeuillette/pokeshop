import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartItems(state, action) {
      console.log({ state, action });
      state.cartItems = action.payload;
    },
  },
});

export const { cartItems } = cartSlice.actions;
export const getCartItems = (state) => state.cart.cartItems;

export default cartSlice.reducer;
