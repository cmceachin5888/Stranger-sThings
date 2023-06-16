import React from "react";
import { Link } from "react-router-dom";

export const Navbar = ({ token, setToken }) => {
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <div id="container">
      <div id="navbar">
        <Link to="/">Posts</Link>
        {!token ? <Link to="/Login">Login</Link> : null}
        {!token ? <Link to="/Register">Register</Link> : null}
        {token ? <Link to="/MakePost">New Post</Link> : null}
        {token ? <a onClick={logout}>Logout?</a> : null}
      </div>
    </div>
  );
};

export default Navbar;
