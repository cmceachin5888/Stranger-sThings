import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  Login,
  MakePostMessages,
  Posts,
  MakePost,
  ViewPost,
  UpdatePost,
  Profile,
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
  const [messagesToUser, setMessagesToUser] = useState([]);
  const [messagesFromUser, setMessagesFromUser] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem("userId", userId);
  }, [userId]);

  return (
    <BrowserRouter>
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
                userData={userData}
                setUserData={setUserData}
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
            element={<MakePostMessages userId={userId} />}
          />
          <Route
            path="/Profile"
            element={
              <Profile
                token={token}
                userData={userData}
                setUserData={setUserData}
                messagesToUser={messagesToUser}
                messagesFromUser={messagesFromUser}
                setMessagesToUser={setMessagesToUser}
                setMessagesFromUser={setMessagesFromUser}
              />
            }
          />
          <Route
            path="/ViewPost/:postId"
            element={
              <ViewPost
                token={token}
                isLoggedIn={isLoggedIn}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
