import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  Login,
  // Messages,
  Posts,
  MakePost,
  // Profile
  Register,
  // LoggedOut,
  Navbar,
} from "./components";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const currentUser = 

  useEffect(() => {
    const storage = localStorage.getItem("token");
    setToken(storage);
  }, []);

  return (
    <BrowserRouter>
      {/*Using path='/' in order to make it the home page when you login*/}
      <div className="app">
        <Navbar token={token} setToken={setToken} />
        <Routes>
          <Route
            path="/Login"
            element={
              <Login
                token={token}
                setToken={setToken}
                loading={loading}
                setLoading={setLoading}
              />
            }
          />
          ;{/* <Messages />; */}
          <Route
            path="/"
            element={
              <Posts
                posts={posts}
                setPosts={setPosts}
                loading={loading}
                setLoading={setLoading}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route
            path="/MakePost"
            element={
              <MakePost
                posts={posts}
                setPosts={setPosts}
                loading={loading}
                setLoading={setLoading}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          {/* <Profile /> */}
          <Route
            path="/Register"
            element={
              <Register
                token={token}
                setToken={setToken}
                loading={loading}
                setLoading={setLoading}
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
