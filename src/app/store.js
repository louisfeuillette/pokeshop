import { configureStore } from "@reduxjs/toolkit";

import pokemonReducer from "../features/fetch/pokemonSlice";
import cartReducer from "../features/cart/carteSlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;
