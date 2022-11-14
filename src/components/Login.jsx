import { useState } from "react";
import React from "react";
import facade from "../apiFacade";

const Login = ({ login }) => {
  const init = { username: "", password: "" };
  const reginit = {
    username: "",
    password: "",
    sex: "",
    roles: [],
  };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [regCredentials, setRegCredentials] = useState(reginit);
  const [register, setRegister] = useState(false);

  const performRegister = (evt) => {
    evt.preventDefault();
    facade.register(
      regCredentials.username,
      regCredentials.password,
      regCredentials.sex,
      regCredentials.roles
    );
    setRegister(false);
    setLoginCredentials(init);
  };

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };
  const onChange = (evt) => {
    register
      ? setRegCredentials({
          ...regCredentials,
          [evt.target.id]: evt.target.value,
        })
      : setLoginCredentials({
          ...loginCredentials,
          [evt.target.id]: evt.target.value,
        });
  };

  return (
    <div className="login">
      <h4 style={{ display: "flex" }}>{register ? "Register" : "Login"}</h4>
      <form className="loginform" onChange={onChange}>
        <input type="text" placeholder="username" id="username" required />
        <input type="password" placeholder="password" id="password" required />
        {register && (
          <div style={{ display: "flex" }}>
            <select id="sex" defaultValue="0">
              <option value="0" disabled hidden>
                Gender
              </option>
              <option value="m">male</option>
              <option value="f">female</option>
            </select>
            <div
              style={{
                color: "white",
                flexGrow: "1",
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: "1",
                  alignItems: "center",
                }}
              >
                <label htmlFor="admin">admin</label>
                <input
                  className="m-0"
                  type="checkbox"
                  value="admin"
                  id="admin"
                  onChange={(e) => {
                    e.target.checked
                      ? regCredentials.roles.push(e.target.value)
                      : regCredentials.roles.splice(
                          regCredentials.roles.indexOf(e.target.value)
                        );
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: "1",
                  alignItems: "center",
                }}
              >
                <label htmlFor="admin">user</label>
                <input
                  className="m-0"
                  type="checkbox"
                  onChange={(e) => {
                    e.target.checked
                      ? regCredentials.roles.push(e.target.value)
                      : regCredentials.roles.splice(
                          regCredentials.roles.indexOf(e.target.value)
                        );
                  }}
                  id="user"
                  value="user"
                />
              </div>
            </div>
          </div>
        )}
      </form>
      <div
        className="row"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <button onClick={performLogin} className="btn btn-primary">
          Login
        </button>
        {register ? (
          <button className="btn btn-success" onClick={performRegister}>
            Confirm
          </button>
        ) : (
          <button className="btn btn-primary" onClick={() => setRegister(true)}>
            Register
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
