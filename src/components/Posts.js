import React, { useEffect, useState } from "react";
import { fetchPosts, deletePost, fetchUserData } from "../api";
import { useNavigate } from "react-router-dom";

const RenderAllPosts = ({
  posts,
  setPosts,
  isLoading,
  setLoading,
  isLoggedIn,
  setIsLoggedIn,
  userId,
  setUserId,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          setIsLoggedIn(true);
          const userData = await fetchUserData(token);
          setUserId(userData.data._id);
        }

        const result = await fetchPosts(token);

        setPosts(result);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostsData();
  }, []);

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await deletePost(token, postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handlePostUpdate = (postId) => {
    navigate(`/UpdatePost/${postId}`);
  };

  const handleMessageUpdate = (postId) => {
    navigate(`/PostMessage/${postId}`);
  };

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  return (
    <>
      <h1>Posts</h1>
      {posts.map((post) => {
        if (!post) {
          return null;
        }

        const isAuthor = post.author?._id === userId;

        return (
          <div className="posts" key={post._id}>
            <h3>{post.title}</h3>
            <div>{post.author?.username || "Unknown"}</div>
            <div>Description: {post.description}</div>
            <div>Price: {post.price}</div>
            <div>Location: {post.location}</div>
            <div>
              Will Deliver?:{" "}
              {post.willDeliver ? "Will Deliver" : "Will NOT deliver"}
            </div>

            {isLoggedIn && isAuthor && (
              <>
                <button
                  onClick={() => {
                    handleDelete(post._id);
                  }}
                >
                  Delete Post
                </button>
                <button
                  onClick={() => {
                    handlePostUpdate(post._id);
                  }}
                >
                  Update Post
                </button>
              </>
            )}

            {isLoggedIn && !isAuthor && (
              <>
                <button
                  onClick={() => {
                    handleMessageUpdate(post._id);
                  }}
                >
                  Message Seller
                </button>
              </>
            )}
          </div>
        );
      })}
    </>
  );
};

export default RenderAllPosts;
