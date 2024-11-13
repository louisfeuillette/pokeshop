import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import ky from "ky";

import pokemonReducer, {
  fetchPokemon,
  pagination,
} from "../fetch/pokemonSlice";

const API_URL = import.meta.env.VITE_API_URL;

describe("pokemonSlice", () => {
  let store;
  let initialState;
  let newItems;
  let page;
  let totalCount;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        pokemon: pokemonReducer,
      },
    });

    initialState = {
      cards: [],
      status: "idle",
      error: "",
      totalCount: null,
      page: 1,
    };
    newItems = [
      { id: 1, name: "Pikachu" },
      { id: 2, name: "Charmander" },
    ];
    page = 1;
    totalCount = 2;
  });

  afterEach(() => {
    store = null;
    vi.clearAllMocks();
  });

  it("should return the initial state", () => {
    expect(pokemonReducer(undefined, { type: undefined })).toEqual(
      initialState
    );
  });

  it("should fetchPokemon", async () => {
    const size = 6;

    ky.get = vi.fn(() => ({
      json: vi.fn().mockResolvedValue({ data: newItems, totalCount }),
    }));

    await store.dispatch(fetchPokemon({ page, size }));

    const state = store.getState().pokemon;

    expect(ky.get).toHaveBeenCalledWith(
      `${API_URL}/cards?q=set.name:"151"&pageSize=${size}&page=${page}`
    );

    expect(state.cards).toStrictEqual(newItems);
    expect(state.totalCount).toBe(totalCount);
    expect(state.status).toBe("succeeded");
  });
  describe("reducers", () => {
    it("should handle pagination", () => {
      const page = 2;

      const action = pagination(page);
      const state = pokemonReducer(initialState, action);

      expect(state.page).toEqual(2);
    });
  });
  describe("extraReducers", () => {
    it("sets status loading when fetchPokemon is pending", () => {
      const action = { type: fetchPokemon.pending.type };
      const state = pokemonReducer(initialState, action);

      expect(state.status).toBe("loading");
    });

    it("sets the stats with cards when fetchPokemon is fulfilled", () => {
      const action = {
        type: fetchPokemon.fulfilled.type,
        payload: { data: newItems, totalCount },
      };
      const state = pokemonReducer(initialState, action);

      expect(state).toEqual({
        cards: [
          { id: 1, name: "Pikachu" },
          { id: 2, name: "Charmander" },
        ],
        status: "succeeded",
        error: "",
        totalCount: 2,
        page: 1,
      });
    });

    it("sets fetching false when fetchPokemon is rejected", () => {
      const action = {
        type: fetchPokemon.rejected.type,
        error: { message: "some error" },
      };
      const state = pokemonReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        status: "failed",
        error: "some error",
      });
    });
  });
});
