import { json } from "react-router-dom";

const URL = "https://fluffatheduck.dk/tomcat/CA2";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const makeid = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const addFav = async (name, id, username) => {
    const options = makeOptions("PUT", true, {
      pokename: name,
      pokeid: id,
      username: username,
    });
    const data = await fetch(URL + "/api/pokemon/addfav", options);
    return await data.json();
  };

  const removeFav = async (name, id, username) => {
    const options = makeOptions("PUT", true, {
      pokename: name,
      pokeid: id,
      username: username,
    });
    const data = await fetch(URL + "/api/pokemon/removefav", options);
    return await data.json();
  };

  const register = async (user, password, sex, roles) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
      sex: sex,
      roles: roles,
    });
    return await fetch(URL + "/api/Generate/user", options);
  };

  const removeUser = async (user) => {
    const options = makeOptions("POST", true, {
      prompt: user,
    });
    const data = await fetch(URL + "/api/Generate/user/remove", options);
    logout();
    console.log(await data.json());
  };

  const login = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  };
  const fetchData = () => {
    /*TODO */
  };

  const checkFav = async (username, pokemonid) => {
    const data = await fetch(
      URL + `/api/pokemon/checkfav/${username}/${pokemonid}`
    );
    const res = await data.json();
    console.log(res);
    return res;
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };
  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    register,
    removeUser,
    makeid,
    addFav,
    checkFav,
    removeFav,
  };
}
const facade = apiFacade();
export default facade;
