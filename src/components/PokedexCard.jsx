import { useEffect, useState } from "react";
import img from "../assets/pokeload.gif";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import facade from "../apiFacade";
import { getUserInfo } from "../utils/credentialsHelper";

const PokedexCard = ({ loggedIn, name, url }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [pokeType, setPokeType] = useState();
  const [pokemon, setPokemon] = useState();
  const [pokemonFound, setPokemonFound] = useState(false);
  const [pokemonImg, setPokemonImg] = useState(img);
  const fetchPokemon = async () => {
    const data = await fetch(url);
    const res = await data.json();
    console.log(res);
    setPokemon(res);
    setPokemonFound(true);
    setPokemonImg(
      `../../../src/assets/pokemon/other/dream-world/${res.id}.svg`
    );
    fetchPokeType(res.id);
  };
  const fetchPokeType = async (id) => {
    const fetchurl = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const data = await fetch(fetchurl);
    const res = await data.json();
    setPokeType(res.types);
    checkIfLiked(id);
  };
  const checkIfLiked = async (id) => {
    setIsLiked(await facade.checkFav(getUserInfo().username, id));
  };
  const imgNotFound = () => {
    setPokemonImg(
      `../../../src/assets/pokemon/other/official-artwork/${pokemon.id}.png`
    );
  };
  useEffect(() => {
    fetchPokemon();
  }, [name]);

  const favPokemon = async () => {
    isLiked
      ? console.log(
          await facade.addFav(name, pokemon.id, getUserInfo().username)
        )
      : console.log(
          await facade.removeFav(name, pokemon.id, getUserInfo().username)
        );
    setIsLiked(!isLiked);
  };

  return (
    <div className="pokedexcard">
      <div
        className="row"
        style={{
          boxShadow: "inset 0 0 5px #000000",
          backgroundColor: "rgb(82, 82, 82)",
          padding: "5px 0",
        }}
      >
        <span>#{pokemonFound && pokemon.id} -</span>
        <span>{name}</span>
      </div>
      <div className="row">
        <img
          onError={() => imgNotFound()}
          src={pokemonImg}
          width={100}
          height={100}
        />
      </div>
      <div className="row">
        <div
          className="types row"
          style={{
            boxShadow: "inset 0 0 5px #000000",
            backgroundColor: "rgb(82, 82, 82)",
            padding: "5px",
          }}
        >
          {pokeType != null &&
            pokeType.map((el) => (
              <div
                key={el.type.name}
                className={`typecard btn-${el.type.name}`}
              >
                {el.type.name}
              </div>
            ))}
        </div>
        {loggedIn && (
          <div
            onDoubleClick={favPokemon}
            style={{
              marginLeft: "5px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {isLiked ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default PokedexCard;
