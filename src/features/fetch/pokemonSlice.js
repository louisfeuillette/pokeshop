import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ky from "ky";

const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  cards: [],
  status: "idle",
  error: "",
  totalCount: null,
  page: 1,
};

export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchPokemon",
  async ({ page }) => {
    const response = await ky
      .get(`${API_URL}/cards?q=set.name:"151"&pageSize=6&page=${page}`)
      .json();
    return { data: response?.data, totalCount: response?.totalCount };
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    pagination(state, action) {
      console.log(action);
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cards = action.payload.data;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { pagination } = pokemonSlice.actions;

export const getPokemonList = (state) => state.pokemon.cards;
export const getPokemonPage = (state) => state.pokemon.page;
export const getPokemonTotalCount = (state) => state.pokemon.totalCount;
export const getPokemonError = (state) => state.pokemon.error;
export const getPokemonStatus = (state) => state.pokemon.status;

export default pokemonSlice.reducer;
