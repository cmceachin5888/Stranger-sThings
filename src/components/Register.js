import React from "react";
import { registerUser } from "../api";

export const registerNew = ({
  username,
  setUsername,
  password,
  setPassword,
  token,
  setToken,
}) => {
  const handleSubmit = (event) => {
    // const username = event.target.username.value;
    event.preventDefault();
    setUsername("");
    setPassword("");

    const registerData = async () => {
      try {
        const result = await registerUser(username, password);
        localStorage.setItem("token", JSON.stringify(result.token));
        setToken(token);
      } catch (error) {
        console.error(error);
      }
    };
    registerData();
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
    //console.log(setUsername);
  };

  return (
    <div id="container">
      <div id="navbar">Create an Account</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Create a Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Create a Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <div href="REGISTER URL INSERT HERE">Have an Account, Login here!</div>
    </div>
  );
};

export default registerNew;
