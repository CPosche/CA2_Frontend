import { useEffect } from "react";
import PokemonCard from "../PokemonCard";
import PokemonEvolutions from "../PokemonEvolutions";

const Pokemon = ({ pokemon, evolutionchain }) => {
  return (
    <div className="pokemoncontent">
      <div className="row">
        <PokemonCard
          name={pokemon.name}
          type={pokemon.types}
          pokedex={pokemon.id}
          stats={pokemon.stats}
        />
        <PokemonEvolutions
          id={pokemon.id}
          type={pokemon.types}
          evolutionchain={evolutionchain}
        />
      </div>
    </div>
  );
};

export default Pokemon;
