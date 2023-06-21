import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link } from "@mui/material";

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
    <div id="mainNav">
      <div id="navbartitle">
        Stranger Things
        <div id="navbarlink">
          <Link component={RouterLink} to="/" underline="hover">
            Posts
          </Link>
          {!token ? (
            <Link
              component={RouterLink}
              to="/Login"
              underline="hover"
              color="red"
            >
              Login
            </Link>
          ) : null}
          {!token ? (
            <Link
              component={RouterLink}
              to="/Register"
              underline="hover"
              color="red"
            >
              Register
            </Link>
          ) : null}
          {token ? (
            <Link component={RouterLink} to="/MakePost" underline="hover">
              New Post
            </Link>
          ) : null}
          {token ? (
            <Link
              component={RouterLink}
              to="/Profile"
              underline="hover"
              color="red"
            >
              Profile
            </Link>
          ) : null}
          {token ? (
            <a id="logout" onClick={logout}>
              Logout?
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;