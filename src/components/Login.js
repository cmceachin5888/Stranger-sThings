import React, { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setToken, setLoading, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      return;
    }

    const loginData = async () => {
      setLoading(true);

      try {
        const result = await loginUser(username, password);
        localStorage.setItem("token", result.token);
        setToken(result.token);
        setIsLoggedIn(true);
        setUsername("");
        setPassword("");
        navigate("/Profile");
      } catch (error) {
        setErrorMessage(error?.message || "An error occurred");
        setUsername("");
        setPassword("");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loginData();
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <div id="container">
      <div id="navbar">Login Here!</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          placeholder="Username"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
      <div>{errorMessage}</div>
      <div
        onClick={() => {
          navigate("/Register");
        }}
      >
        {" "}
        Need to Register? Click Here!
      </div>
    </div>
  );
};

export default LoginForm;
