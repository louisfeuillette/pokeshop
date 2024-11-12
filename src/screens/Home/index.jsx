import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchPokemon,
  getPokemonList,
} from "../../features/fetch/pokemonSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemon());
  }, []);

  const pokemons = useSelector(getPokemonList);
  console.log(pokemons[0]);

  return (
    <>
      <p>POKESHOP</p>
      <ul>
        {pokemons.map((p, i) => (
          <li key={i}>{p.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Home;
