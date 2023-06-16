import React, { useState, useEffect } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ token, setToken, loading, setLoading }) => {
  const navigate = useNavigate();

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
        localStorage.setItem("token", result.token);
        setToken(result.token);
        setUsername("");
        setPassword("");
      } catch (error) {
        setErrorMessage(error?.message || "An error occurred");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loginData();
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
    return () =>{};
  }, [navigate, token]);

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
          onChange={(e) => setUsername(e.target.value)}
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

export default LoginForm;
