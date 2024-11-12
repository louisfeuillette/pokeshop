import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Container,
  Box,
  CircularProgress,
  Typography,
  Button,
  Stack,
  Alert,
  Chip,
} from "@mui/material";

import Header from "../../components/Header";

import {
  fetchPokemon,
  getPokemonError,
  getPokemonList,
  getPokemonStatus,
  getPokemonTotalCount,
} from "../../features/fetch/pokemonSlice";

const pageSize = 6;

const Home = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [shoppingCart, setShoppingCart] = useState([]);
  console.log(shoppingCart);

  useEffect(() => {
    dispatch(fetchPokemon({ page }));
  }, [page]);

  const pokemons = useSelector(getPokemonList);
  const totalCount = useSelector(getPokemonTotalCount);
  const status = useSelector(getPokemonStatus);
  const error = useSelector(getPokemonError);

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleAddCart = (pokemon) => {
    setShoppingCart([...shoppingCart, pokemon]);
  };

  const handlePrevious = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Container maxWidth={false}>
        {status === "failed" ? (
          <Alert severity="warning">{error}</Alert>
        ) : status === "loading" ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Header cart={shoppingCart} />
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <Stack
                direction="row"
                sx={{ flexWrap: "wrap", justifyContent: "center" }}
              >
                {pokemons.map((p, i) => (
                  <img
                    key={i}
                    src={p.images.small}
                    style={{
                      margin: "1.5rem 3rem",
                      cursor: "pointer",
                      "&:hover": { scale: "1.04" },
                    }}
                    onClick={() => handleAddCart(p)}
                  />
                ))}
              </Stack>
            </Box>
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: "center", marginBottom: 5 }}
            >
              <Button
                variant="contained"
                onClick={handlePrevious}
                disabled={page === 1}
              >
                previous
              </Button>
              <Chip label={page} />
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={page === totalPages}
              >
                next
              </Button>
            </Stack>
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
