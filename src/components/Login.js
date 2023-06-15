import React, { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";

export const loginForm = ({ token, setToken, loading, setLoading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    // const username = event.target.username.value;
    if (!username || !password) {
      return;
    }

    setLoading(true);

    event.preventDefault();

    const loginData = async () => {
      try {
        const result = await loginUser(username, password);
        localStorage.setItem("token", JSON.stringify(result.token));
        setToken(result.token);
        setUsername("");
        setPassword("");
      } catch (error) {
        setErrorMessage(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loginData();
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
    //console.log(setUsername);
  };

  if (token) {
    const navigate = useNavigate();
    navigate("/Posts");
  }

  return (
    <div id="container">
      <div id="navbar">Login Here!</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          placeholder={"Username"}
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          placeholder={"Password"}
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
      <div>{errorMessage}</div>
      <div href="REGISTER URL INSERT HERE">Need to Register? Click Here!</div>
    </div>
  );
};

export default loginForm;
