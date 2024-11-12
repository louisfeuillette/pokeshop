import { configureStore } from "@reduxjs/toolkit";

import pokemonReducer from "../features/fetch/pokemonSlice";
import cartReducer from "../features/cart/carteSlice";

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    cart: cartReducer,
  },
});

export default store;
