import React, { useState, useEffect } from "react";

export const searchFunc = () => {
  const token = localStorage.getItem("token");

  const [posts, setPosts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const postsData = await fetchPosts(token);
    } catch (err) {
      console.error("Trouble finding results", err);
    } finally {
      setLoading(false);
    }
  };

  fetch;

  const handleSearch = (post, text) => {
    return (
      post.title.includes(text) ||
      post.description.includes(text) ||
      post.author.username ||
      post.price ||
      post.location
    );
  };

  const filteredPosts = posts.filter((post) => handleSearch(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  return (
    <div>
      <input
        type="text"
        name="Search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      {/* {postsToDisplay.map((post) => (
        <div className="posts" key={post._id}>
          <h3>{post.title}</h3>
          <div>{post.author?.username || "Unknown User"}</div>
          <div>Description: {post.description}</div>
          <div>Price: {post.price}</div>
          <div>Location: {post.location}</div>
          <div>
            Will Deliver?:{" "}
            {post.willDeliver ? "Will Deliver" : "Will NOT deliver"}
          </div>
          {isLoggedIn && (
            <button onClick={() => handleViewPost(post._id)}>View Post</button>
          )}
        </div>
      ))} */}
    </div>
  );
};

export default searchFunc;