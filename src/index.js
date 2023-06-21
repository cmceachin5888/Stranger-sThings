import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  Navbar,
  Loading,
  Register,
  Login,
  Profile,
  Posts,
  ViewPost,
  MakePost,
  UpdatePost,
  MakePostMessages,
  Search,
} from "./components";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //Do we need these then?
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  // const [postId, setPostId] = useState("");
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
        <Search
          posts={posts}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Routes>
          <Route
            path="/Register"
            element={
              <Register
                setToken={setToken}
                setLoading={setLoading}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route
            path="/Login"
            element={
              <Login
                setToken={setToken}
                setLoading={setLoading}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
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
            path="/"
            element={
              <Posts
                posts={posts}
                setPosts={setPosts}
                setLoading={setLoading}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                // userId={userId}
                // setUserId={setUserId}
                // postId={postId}
                // setPostId={setPostId}
                // userData={userData}
                setUserData={setUserData}
              />
            }
          />
          <Route
            path="/ViewPost/:postId"
            element={
              <ViewPost
                token={token}
                isLoggedIn={isLoggedIn}
                loading={loading}
                setLoading={setLoading}
                userData={userData}
                setUserData={setUserData}
                posts={posts}
                // setPosts={setPosts}
              />
            }
          />
          <Route
            path="/MakePost"
            element={
              <MakePost
                posts={posts}
                setPosts={setPosts}
                setLoading={setLoading}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                // userId={userId}
              />
            }
          />
          <Route
            path="/UpdatePost/:postId"
            element={
              <UpdatePost
                loading={loading}
                setLoading={setLoading}
                // isLoggedIn={isLoggedIn}
                // setIsLoggedIn={setIsLoggedIn}
                posts={posts}
                setPosts={setPosts}
                userData={userData}
                setUserData={setUserData}
              />
            }
          />
          {/* <Route
            path="/PostMessage/:postId"
            element={<MakePostMessages userId={userId} />}
          /> */}
        </Routes>
        {loading ? <Loading /> : null}
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
