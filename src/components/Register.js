import React, { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

export const registerNew = ({ token, setToken, loading, setLoading }) => {
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

    const registerData = async () => {
      try {
        const result = await registerUser(username, password);
        localStorage.setItem("token", result.token);
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
    registerData();
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
    //console.log(setUsername);
  };

  if (result.token) {
    const navigate = useNavigate();
    navigate("/Posts");
  }

  return (
    <div id="container">
      <div id="navbar">Create an Account</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Create a Username:</label>
        <input
          placeholder={"Username"}
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Create a Password:</label>
        <input
          placeholder={"Password"}
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <div>{errorMessage}</div>
      <div href="REGISTER URL INSERT HERE">Have an Account, Login here!</div>
    </div>
  );
};

export default registerNew;
