import React, { useState } from "react";
import ReactDOM from "react-dom";

import {
  Login,
  // Messages,
  Posts,
  // Profile
} from "./components";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="app">
      <Login />;
      {/* <Messages />; */}
      <Posts posts={posts} setPosts={setPosts} />;
      {/* <Profile /> */}
      {/* {isLoading ? <Loading /> : null} */}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
