import { describe, it, expect } from "vitest";

import cartReducer, { cartItems, deleteItem } from "./carteSlice";

describe("cartSlice", () => {
  it("should return the initial state", () => {
    const initialState = { cartItems: [] };

    expect(cartReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle cartItems", () => {
    const previousState = { cartItems: [] };
    const newItems = [
      { id: 1, name: "Pikachu" },
      { id: 2, name: "Charmander" },
    ];

    const action = cartItems(newItems);
    const state = cartReducer(previousState, action);

    expect(state.cartItems).toEqual(newItems);
  });

  it("should handle deleteItem", () => {
    const previousState = {
      cartItems: [
        { id: 1, name: "Pikachu" },
        { id: 2, name: "Charmander" },
      ],
    };

    const action = deleteItem(1);
    const state = cartReducer(previousState, action);

    expect(state.cartItems).toEqual([{ id: 2, name: "Charmander" }]);
  });
});
