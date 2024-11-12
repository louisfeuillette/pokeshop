import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ky from "ky";

const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  cards: [],
  status: "idle",
  error: "",
};

export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchPokemon",
  async () => {
    const response = await ky
      .get(`${API_URL}/cards?q=set.name:"151"&pageSize=10&page=1`)
      .json();
    console.log({ response });
    return response?.data;
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log({ payload: action.payload });
        state.cards = action.payload;
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getPokemonList = (state) => state.pokemon.cards;
export const getPokemonError = (state) => state.pokemon.error;
export const getPokemonStatus = (state) => state.pokemon.status;

export default pokemonSlice.reducer;
