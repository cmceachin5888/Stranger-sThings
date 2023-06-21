import React, { useEffect, useState } from "react";
import { fetchPosts, fetchUserData } from "../api";
import { useNavigate } from "react-router-dom";

const RenderAllPosts = ({ setLoading }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPostsData = async () => {
      setLoading(true);

      try {
        const postsData = await fetchPosts(token);
        setPosts(postsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsData();
  }, []);

  const handleViewPost = (postId) => {
    navigate(`/ViewPost/${postId}`);
  };

  return (
    <>
      <h1>Posts</h1>
      {posts.map((post) => (
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
          {token && (
            <button onClick={() => handleViewPost(post._id)}>View Post</button>
          )}
        </div>
      ))}
    </>
  );
};

export default RenderAllPosts;
