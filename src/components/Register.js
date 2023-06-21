import React, { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

const RegisterNew = ({ setToken, setLoading, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username || !password) {
      return;
    }

    const registerData = async () => {
      setLoading(true);

      try {
        const result = await registerUser(username, password);
        localStorage.setItem("token", result.token);
        setToken(result.token);
        setUsername("");
        setPassword("");
        setIsLoggedIn(true);
        navigate("/Profile");
      } catch (error) {
        setErrorMessage(error?.message || "An error occurred");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    registerData();
  };

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
          onChange={(e) => setUsername(e.target.value)}
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
      <div
        onClick={() => {
          navigate("/Login");
        }}
      >
        Have an Account, Login here!
      </div>
    </div>
  );
};

export default RegisterNew;
