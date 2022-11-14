import "./App.css";
import Content from "./components/Content";
import SideBar from "./components/SideBar";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import facade from "./apiFacade.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(facade.loggedIn);

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade.login(user, pass).then((res) => setLoggedIn(true));
  };

  return (
    <div className="App">
      <Router basename="pokedex">
        <SideBar login={login} logout={logout} loggedIn={loggedIn} />
        <Content loggedIn={loggedIn} />
      </Router>
    </div>
  );
}

export default App;
