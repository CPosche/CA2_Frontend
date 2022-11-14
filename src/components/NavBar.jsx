import { NavLink } from "react-router-dom";
import pokeball from "../../src/assets/PokéBall.svg";

const NavBar = () => {
  return (
    <nav className="sidebarnav">
      <ul>
        <NavLink to="/">
          <li>
            <img width={30} src={pokeball} />
            Home
          </li>
        </NavLink>
        <NavLink to="/pokedex">
          <li>
            <img width={30} src={pokeball} />
            Pokedex
          </li>
        </NavLink>
        <NavLink to="/searchpokemon">
          <li>
            <img width={30} src={pokeball} />
            Find Pokemon
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default NavBar;
