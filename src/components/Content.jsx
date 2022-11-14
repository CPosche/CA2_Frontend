import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import Pokemon from "./pages/Pokemon";

const Content = ({ loggedIn }) => {
  const [pokeSearchInput, setPokeSearchInput] = useState("");
  const [pokemon, setPokemon] = useState();
  const [evolutionChain, setEvolutionChain] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [pokemonFound, setPokemonFound] = useState(false);
  const fetchUrl = "https://fluffatheduck.dk/tomcat/CA2/api/pokemon/";

  const fetchPokemon = async (e) => {
    e.preventDefault();
    setIsFetching(true);
    const data = await fetch(fetchUrl + pokeSearchInput.toLowerCase());
    console.log(data);
    const res = await data.json();
    console.log(res);
    setPokemon(res);
    await fetchEvolutionChain(res.id);
    setPokemonFound(true);
    setIsFetching(false);
    setPokeSearchInput("");
  };

  const fetchEvolutionChain = async (id) => {
    const speciesUrl = `https://PokeApi.co/api/v2/pokemon-species/${id}`;
    const species = await fetch(speciesUrl);
    const speciesres = await species.json();
    console.log(speciesres);
    const evolutionchainurl = await speciesres.evolution_chain.url;
    const evolutionchain = await fetch(evolutionchainurl);
    const evolutionchainres = await evolutionchain.json();
    console.log(evolutionchainres);
    setEvolutionChain(evolutionchainres);
  };

  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokedex" element={<Pokedex loggedIn={loggedIn} />} />
        <Route
          path="/searchpokemon"
          element={
            <>
              <div className="pokemonsearchdiv">
                <div className="row">
                  <h1>Search Pokemon</h1>
                </div>
                <div className="row">
                  <form onSubmit={fetchPokemon} className="searchpokemonform">
                    <input
                      value={pokeSearchInput}
                      onChange={(e) => {
                        setPokeSearchInput(e.target.value);
                      }}
                      type="text"
                      placeholder="Pokemon name"
                    />
                    <button type="submit" className="btn btn-success">
                      {isFetching ? "Fetching..." : "Search"}
                    </button>
                  </form>
                </div>
                {pokemonFound && (
                  <Pokemon pokemon={pokemon} evolutionchain={evolutionChain} />
                )}
              </div>
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default Content;
