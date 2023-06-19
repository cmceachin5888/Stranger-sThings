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
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || ""); //not sure I understand the purpose of this?
  const [postId, setPostId] = useState("");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem("userId", userId);
  }, [userId]);

  return (
    <BrowserRouter>
      {/*Using path='/' in order to make it the home page when you login*/}
      <div className="app">
        <Navbar
          token={token}
          setToken={setToken}
          setIsLoggedIn={setIsLoggedIn}
        />
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
          {/* <Messages />; */}
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
            path="/UpdatePost"
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
