import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartItems(state, action) {
      state.cartItems = action.payload;
    },
    deleteItem(state, action) {
      console.log({ state, action });
      return {
        ...state,
        cartItems: state.cartItems.filter((card) => card.id !== action.payload),
      };
    },
  },
});

export const { cartItems, deleteItem } = cartSlice.actions;
export const getCartItems = (state) => state.cart.cartItems;

export default cartSlice.reducer;
