import PokedexCard from "../PokedexCard";
import { useEffect, useState } from "react";
import GenBtn from "../GenBtn";
const Pokedex = ({ loggedIn }) => {
  const [generations, setGenerations] = useState();
  const [gensFound, setGensFound] = useState(false);
  const [genBtns, setGenBtns] = useState([]);
  const [pokemonGen, setPokemonGen] = useState();
  const [pokemonGenFound, setPokemonGenFound] = useState(false);
  const fetchGenerations = async () => {
    const fetchurl = "https://pokeapi.co/api/v2/generation";
    const data = await fetch(fetchurl);
    const res = await data.json();
    setGenerations(res);
    setGensFound(true);
  };
  const fetchPokemonGen = async (fetchurl) => {
    const data = await fetch(fetchurl);
    const res = await data.json();
    setPokemonGen(res);
    setPokemonGenFound(true);
    console.log(res);
  };
  const populateBtns = (count) => {
    for (let i = 0; i < count; i++) {
      setGenBtns((prevGenBtns) => [
        ...prevGenBtns,
        <GenBtn
          key={i}
          callback={fetchPokemonGen}
          generations={generations}
          gen={i}
        />,
      ]);
    }
  };
  useEffect(() => {
    {
      genBtns.length === 0 && fetchGenerations();
    }
    gensFound && genBtns.length === 0 ? populateBtns(generations.count) : "";
  }, [gensFound]);

  return (
    <div className="pokedexcontent">
      {gensFound && (
        <>
          <div className="row">
            <h1>PokeDex</h1>
          </div>
          <div className="row">{gensFound && genBtns}</div>
          <div className="row pokedexcardrow">
            {pokemonGenFound ? (
              <>
                {pokemonGen.pokemon_species.map((el, index) => (
                  <PokedexCard
                    loggedIn={loggedIn}
                    key={index}
                    name={el.name}
                    url={el.url}
                  />
                ))}
              </>
            ) : (
              <>
                <div className="row">
                  <h1 style={{ margin: "0" }}>&uarr;</h1>
                </div>
                <div className="row">
                  <h1 style={{ margin: "0" }}>
                    Click a generation to get a list of pokemons
                  </h1>
                </div>
              </>
            )}
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default Pokedex;
