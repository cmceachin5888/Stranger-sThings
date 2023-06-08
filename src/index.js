import React, { useState } from "react";
import ReactDOM from "react-dom";

import {
  // Login,
  // Messages,
  Posts,
  // Profile
} from "./components";

const App = () => {
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="app">
      {/* <Login />
      <Messages /> */}
      <Posts postList={postList} setPostList={setPostList} />
      {/* <Profile /> */}
      {isLoading ? <Loading /> : null}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
