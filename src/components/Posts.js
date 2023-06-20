import React, { useEffect, useState } from "react";
import { fetchPosts, fetchUserData } from "../api";
import { useNavigate } from "react-router-dom";

const RenderAllPosts = ({
  posts,
  setPosts,
  isLoading,
  setLoading,
  isLoggedIn,
  setIsLoggedIn,
  setUserData,
}) => {
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          setIsLoggedIn(true);
          const userData = await fetchUserData(token);
          setUserData(userData);
        }
        const postsData = await fetchPosts(token);
        setPosts(postsData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleViewPost = (postId) => {
    navigate(`/ViewPost/${postId}`);
  };

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  return (
    <>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div className="posts" key={post._id}>
          <h3>{post.title}</h3>
          <div>{post.author?.username || "Unknown"}</div>
          <div>Description: {post.description}</div>
          <div>Price: {post.price}</div>
          <div>Location: {post.location}</div>
          <div>
            Will Deliver?: {post.willDeliver ? "Will Deliver" : "Will NOT deliver"}
          </div>
          {isLoggedIn && (
            <button onClick={() => handleViewPost(post._id)}>View Post</button>
          )}
        </div>
      ))}
    </>
  );
};

export default RenderAllPosts;