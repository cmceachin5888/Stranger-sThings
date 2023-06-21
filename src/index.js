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
  // Search,
} from "./components";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  // useEffect(() => {
  //   localStorage.setItem("userId", userId);
  // }, [userId]);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar token={token} setToken={setToken} />
        {/* <Search
          posts={posts}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        /> */}
        <Routes>
          <Route
            path="/Register"
            element={<Register setToken={setToken} setLoading={setLoading} />}
          />
          <Route
            path="/Login"
            element={<Login setToken={setToken} setLoading={setLoading} />}
          />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/" element={<Posts setLoading={setLoading} />} />
          <Route
            path="/ViewPost/:postId"
            element={<ViewPost loading={loading} setLoading={setLoading} />}
          />
          <Route
            path="/MakePost"
            element={<MakePost setLoading={setLoading} />}
          />
          <Route
            path="/UpdatePost/:postId"
            element={<UpdatePost setLoading={setLoading} />}
          />
        </Routes>
        {loading ? <Loading /> : null}
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
