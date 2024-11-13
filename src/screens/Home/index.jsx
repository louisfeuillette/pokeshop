import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Container, Box, CircularProgress, Stack, Alert } from "@mui/material";

import {
  fetchPokemon,
  getPokemonError,
  getPokemonList,
  getPokemonPage,
  getPokemonStatus,
} from "../../features/fetch/pokemonSlice";
import { cartItems } from "../../features/cart/carteSlice";

const Home = () => {
  const dispatch = useDispatch();

  const [shoppingCart, setShoppingCart] = useState([]);

  const pokemons = useSelector(getPokemonList);
  const page = useSelector(getPokemonPage);
  const status = useSelector(getPokemonStatus);
  const error = useSelector(getPokemonError);

  useEffect(() => {
    dispatch(cartItems(shoppingCart));
  }, [shoppingCart]);

  useEffect(() => {
    dispatch(fetchPokemon({ page }));
  }, [page]);

  const handleAddCart = (pokemon) => {
    setShoppingCart([...shoppingCart, pokemon]);
  };

  return (
    <Container maxWidth={false}>
      {status === "failed" ? (
        <Alert severity="warning">{error}</Alert>
      ) : status === "loading" ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Stack
            direction="row"
            sx={{ flexWrap: "wrap", justifyContent: "center" }}
          >
            {pokemons.map((p, i) => (
              <img
                key={i}
                src={p.images.small}
                style={{
                  maxWidth: "150",
                  maxHeight: "230px",
                  width: "auto",
                  height: "auto",
                  margin: "0.7rem 1.5rem",
                  cursor: "pointer",
                }}
                onClick={() => handleAddCart(p)}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Container>
  );
};

export default Home;
