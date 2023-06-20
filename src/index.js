import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  Login,
  MakePostMessages,
  Posts,
  MakePost,
  UpdatePost,
  // Profile
  Register,
  // LoggedOut,
  Navbar,
} from "./components";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [postId, setPostId] = useState("");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem("userId", userId);
  }, [userId]);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route
            path="/Login"
            element={
              <Login
                token={token}
                setToken={setToken}
                loading={loading}
                setLoading={setLoading}
                setIsLoggedIn={setIsLoggedIn}
                setUserId={setUserId}
              />
            }
          />
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
                userId={userId}
                setUserId={setUserId}
                postId={postId}
                setPostId={setPostId}
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
                userId={userId}
              />
            }
          />
          <Route
            path="/UpdatePost/:postId"
            element={
              <UpdatePost
                postId={postId}
                setLoading={setLoading}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                posts={posts}
                setPosts={setPosts}
              />
            }
          />
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
          <Route
            path="/PostMessage/:postId"
            element={
              <MakePostMessages
                userId={userId}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));