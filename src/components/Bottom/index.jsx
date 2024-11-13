import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Chip, Stack } from "@mui/material";

import {
  getPokemonPage,
  getPokemonTotalCount,
  pagination,
} from "../../features/fetch/pokemonSlice";

const pageSize = 6;

const Bottom = () => {
  const dispatch = useDispatch();

  const pageFromState = useSelector(getPokemonPage);
  const totalCount = useSelector(getPokemonTotalCount);

  const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    dispatch(pagination(pageFromState));
  }, [pageFromState]);

  const handlePrevious = () => {
    const previousPage = pageFromState - 1;
    dispatch(pagination(previousPage));
  };

  const handleNext = () => {
    const nextPage = pageFromState + 1;
    dispatch(pagination(nextPage));
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100vw",
        height: "15vh",
        backgroundColor: "#242424",
        padding: 5,
      }}
    >
      <Stack
        id="stack bottom"
        direction="row"
        spacing={2}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <Button
          variant="contained"
          onClick={handlePrevious}
          disabled={pageFromState === 1}
        >
          previous
        </Button>
        <Chip label={pageFromState} />
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={pageFromState === totalPages}
        >
          next
        </Button>
      </Stack>
    </Box>
  );
};

export default Bottom;
