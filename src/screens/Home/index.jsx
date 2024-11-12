import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Container,
  Box,
  CircularProgress,
  Typography,
  Button,
  Stack,
  Card,
  Alert,
} from "@mui/material";

import {
  fetchPokemon,
  getPokemonError,
  getPokemonList,
  getPokemonStatus,
} from "../../features/fetch/pokemonSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemon());
  }, []);

  const pokemons = useSelector(getPokemonList);
  const status = useSelector(getPokemonStatus);
  const error = useSelector(getPokemonError);

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
            <Typography variant="h1" sx={{ marginY: 2 }}>
              Pokemon List
            </Typography>
            <Box
              id="tototo"
              sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
            >
              <Stack spacing={3}>
                {pokemons.map((p, i) => (
                  <Card key={i}>{p.name}</Card>
                ))}
              </Stack>
            </Box>
            <Stack direction="row" spacing={2} sx={{ marginBottom: 5 }}>
              <Button variant="contained">previous</Button>
              <Button variant="contained">next</Button>
            </Stack>
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
