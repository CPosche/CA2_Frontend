import NavBar from "./NavBar";
import Login from "./Login";
import SideBarHeader from "./SideBarHeader";
import LoggedIn from "./LoggedIn";

const SideBar = ({ login, logout, loggedIn }) => {
  return (
    <div className="sidebar">
      <SideBarHeader />
      <NavBar />
      <div className="hr"></div>
      {!loggedIn ? (
        <Login login={login} />
      ) : (
        <div>
          <LoggedIn logout={logout} />
          <button className="btn btn-primary" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default SideBar;
