import { useState, useEffect } from "react";
import React from "react";
import facade from "../apiFacade";
import imageF from "../assets/pokemon/other/dream-world//29.svg";
import imageM from "../assets/pokemon/other/dream-world/32.svg";

function LoggedIn({ logout }) {
  const [dataFromServer, setDataFromServer] = useState();

  const fetchUserInfo = async () => {
    let fetchurl = "https://fluffatheduck.dk/tomcat/CA2/api/info";
    let data = await fetch(fetchurl, facade.makeOptions("GET", true));
    const res = await data.json();
    setDataFromServer(res);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div>
      <div className="row text-center text-white">
        <h2 className="m-0">Logged in as</h2>
      </div>
      <div className="row text-center text-white">&darr;</div>
      <div className="row text-center text-white">
        <h3
          className="m-0"
          style={{
            marginTop: "10px",
            backgroundColor: "rgb(100, 0, 0)",
            padding: "2px 10px 5px 10px",
            boxShadow: "inset 0 0 10px #000000",
            borderRadius: "10px",
          }}
        >
          {dataFromServer == null ? `Loading...` : dataFromServer.username}
        </h3>
      </div>
      {dataFromServer != null && (
        <div className="row text-white text-center">
          <div>
            <img
              style={{
                backgroundColor: "rgb(100, 0, 0)",
                marginTop: "10px",
                padding: "10px",
                boxShadow: " inset 0 0 10px #000000",
                borderRadius: "10px",
              }}
              width={60}
              src={dataFromServer.sex == "m" ? imageM : imageF}
            />
            <div className="row text-center">
              <span>Roles:</span>
            </div>
            <div
              style={{
                padding: "10px",
                backgroundColor: "rgb(100, 0, 0)",
                borderRadius: "10px",
              }}
            >
              {dataFromServer.roles.map((el, index) => (
                <span
                  key={index + 1}
                  style={{ display: "block", textAlign: "center" }}
                >
                  {el}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="row text-center">
        <button
          style={{ marginTop: "10px" }}
          onClick={() => {
            facade.removeUser(dataFromServer.username);
            logout();
          }}
          className="btn btn-danger"
        >
          Delete user
        </button>
      </div>
    </div>
  );
}
export default LoggedIn;
