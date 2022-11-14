import facade from "../apiFacade";

function decodeJwt() {
  const token = facade.getToken();
  if (!token) return undefined;
  const jwtData = token.split(".")[1];
  const decodedJwtJsonData = window.atob(jwtData);
  const decodedJwtData = JSON.parse(decodedJwtJsonData);
  return decodedJwtData;
}

function getUsername(jwt) {
  return jwt && jwt.username;
}

function getUserRoles(jwt) {
  if (!jwt || !jwt.roles) return false;
  return jwt.roles.split(",");
}

function getUserInfo() {
  const jwtData = decodeJwt();
  return {
    username: getUsername(jwtData),
    roles: getUserRoles(jwtData) || [],
  };
}

export { getUserInfo };
