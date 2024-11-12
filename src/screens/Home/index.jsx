import { useEffect, useState } from "react";
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
  Chip,
} from "@mui/material";

import {
  fetchPokemon,
  getPokemonError,
  getPokemonList,
  getPokemonStatus,
  getPokemonTotalCount,
} from "../../features/fetch/pokemonSlice";

const pageSize = 10;

const Home = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchPokemon({ page }));
  }, [page]);

  const pokemons = useSelector(getPokemonList);
  const totalCount = useSelector(getPokemonTotalCount);
  const status = useSelector(getPokemonStatus);
  const error = useSelector(getPokemonError);

  const totalPages = Math.ceil(totalCount / pageSize);

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
