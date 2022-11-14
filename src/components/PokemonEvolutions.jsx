import { useEffect, useState } from "react";

const PokemonEvolutions = ({ id, type, evolutionchain }) => {
  const [evolutionChain, setEvolutionChain] = useState();
  const checkEvolChain = async () => {
    var evol = [];
    var data;
    var res;
    data = await fetch(evolutionchain.chain.species.url);
    res = await data.json();
    evol.push([await res.id, await res.name]);
    if (evolutionchain.chain.evolves_to.length != 0) {
      data = await fetch(evolutionchain.chain.evolves_to[0].species.url);
      res = await data.json();
      evol.push([await res.id, await res.name]);
      if (evolutionchain.chain.evolves_to[0].evolves_to.length != 0) {
        data = await fetch(
          evolutionchain.chain.evolves_to[0].evolves_to[0].species.url
        );
        res = await data.json();
        evol.push([await res.id, await res.name]);
      }
    }
    console.log(evol);
    setEvolutionChain(evol);
  };

  useEffect(() => {
    checkEvolChain();
  }, [evolutionchain]);

  return (
    <div className={`evolutionchain ${type[0].type.name}card`}>
      <div className="evolutionchainbackground">
        <div className="row">
          <span style={{ margin: "10px 0", color: "black" }}>
            Evolutions - #{evolutionchain.id}
          </span>
        </div>
        <div
          className="evol row"
          style={{
            flexDirection: "column",
            alignItems: "center",
            color: "black",
          }}
        >
          {evolutionChain != null &&
            evolutionChain.map((el, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  className={`evolcard ${el[0] === id && `currevol`}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span className="evolname">{el[1]}</span>
                  <img
                    width={70}
                    src={`../../src/assets/pokemon/other/dream-world/${el[0]}.svg`}
                    onError={(e) => {
                      e.target.src = `../../src/assets/pokemon/other/official-artwork/${el[0]}.png`;
                    }}
                  />
                </div>
                {index != evolutionChain.length - 1 && (
                  <span style={{ fontSize: "18px" }}>&darr;</span>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonEvolutions;
