import { useEffect, useState } from "react";
import facade from "../apiFacade";
import img from "../../src/assets/pokeload.gif";
import { getUserInfo } from "../utils/credentialsHelper";

const PokemonCard = ({ type, name, pokedex, stats }) => {
  const [alternate, setAlternate] = useState(false);
  const [extraPrompt, setExtraPrompt] = useState("");
  const [pokeimg, setPokeImg] = useState();

  useEffect(() => {
    setPokeImg(`../../src/assets/pokemon/other/dream-world/${pokedex}.svg`);
  }, [pokedex]);

  const revertImg = (pokeimg) => {
    setPokeImg(`../../src/assets/pokemon/other/dream-world/${pokeimg}.svg`);
    setAlternate(false);
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && facade.loggedIn()) {
      opts.headers["x-access-token"] = facade.getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  const imgNotFound = () => {
    setPokeImg(
      `../../src/assets/pokemon/other/official-artwork/${pokedex}.png`
    );
  };

  const fetchAlternateImage = async (pokename, extra) => {
    let fetchUrl = "https://fluffatheduck.dk/tomcat/CA2/api/dalle/admin";
    const options = makeOptions("POST", true, {
      prompt: pokename,
      extra: extra,
    });
    setPokeImg(img);
    let data = await fetch(fetchUrl, options);
    if (data.status != 200) {
      fetchUrl = "https://fluffatheduck.dk/tomcat/CA2/api/dalle";
      data = await fetch(fetchUrl, options);
    }
    const res = await data.json();
    setPokeImg(await res.data[0].url);
    setExtraPrompt("");
    setAlternate(true);
    console.log(res);
  };

  return (
    <div
      className={`card-border ${
        type.length === 1 ? type[0].type.name : type[1].type.name
      }card`}
    >
      <div className={`card ${type[0].type.name}card`}>
        <div className="card-header">
          #{pokedex} - {name[0].toUpperCase() + name.substring(1)}
        </div>
        <div className="card-image">
          <img
            style={{ borderRadius: "10px" }}
            width={200}
            height={200}
            src={pokeimg}
            onError={() => imgNotFound()}
          />
        </div>
        <div className="card-body">
          <div className="row">
            <h4
              style={{
                boxShadow: "inset 0 2px 5px #000000",
                padding: "0 5px",
                borderRadius: "5px 5px 0 0",
              }}
            >
              Stats:
            </h4>
          </div>
          <div className="row">
            <div className="statstext">
              <div className="row">
                {stats.map((el) => (
                  <div key={facade.makeid(10)} className="stat">
                    <h5>{el.stat.name}</h5>
                    <span>&darr;</span>
                    <p>{el.base_stat}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button
            className={`btn btn-${
              type.length === 1 ? type[0].type.name : type[1].type.name
            }`}
            onClick={() =>
              alternate
                ? revertImg(pokedex)
                : fetchAlternateImage(name, extraPrompt)
            }
          >
            {alternate ? `Normal` : `Alternate`} {name}
          </button>
          {!alternate && (
            <input
              type="text"
              value={extraPrompt}
              onChange={(e) => setExtraPrompt(e.target.value)}
              placeholder="extra prompt"
              style={{ width: "100px", marginLeft: "10px" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
