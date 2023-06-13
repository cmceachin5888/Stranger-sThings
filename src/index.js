import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";

import {
  Login,
  // Messages,
  Posts,
  // Profile
  Register,
} from "./components";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
      const token = JSON.parse(storage);
      setToken(token);
    }
  }, []);

  return (
    <BrowserRouter>
      <div id="container">
        <div id="navbar">
          <Link to="/Login">Login</Link>
          <Link to="/Register">Register</Link>
          <Link to="/Posts">Posts</Link>
        </div>
      </div>

      <div className="app">
        <Routes>
          <Route
            path="/Login"
            element={
              <Login
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                token={token}
                setToken={setToken}
              />
            }
          />
          ;{/* <Messages />; */}
          <Route
            path="/Posts"
            element={<Posts posts={posts} setPosts={setPosts} />}
          />
          {/* <Profile /> */}
          <Route
            path="/Register"
            element={
              <Register
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                token={token}
                setToken={setToken}
              />
            }
          />
          {/* {isLoading ? <Loading /> : null} */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
