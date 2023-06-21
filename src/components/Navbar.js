import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    alert("You are now Logged out!");
    console.log("You are now Logged out!");

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/Login");
    }
  };

  return (
    <div id="container">
      <div id="navbar">
        <Link to="/">Posts</Link>
        {!token ? <Link to="/Login">Login</Link> : null}
        {!token ? <Link to="/Register">Register</Link> : null}
        {token ? <Link to="/MakePost">New Post</Link> : null}
        {token ? <Link to="/Profile">Profile</Link> : null}
        {token ? <a onClick={logout}>Logout?</a> : null}
      </div>
    </div>
  );
};

export default Navbar;
