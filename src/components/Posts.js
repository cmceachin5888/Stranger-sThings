import React, { useEffect, useState } from "react";
import { fetchPosts, deletePost, fetchUserData } from "../api"; 

const RenderAllPosts = ({ 
  posts,
  setPosts,
  isLoading,
  setLoading,
  isLoggedIn,
  setIsLoggedIn,
  userId,
  setUserId }) => {


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
            <div>{post.description}</div>
            <div>{post.price}</div>
            <div>{post.location}</div>
            <div>{post.willDeliver ? "Will Deliver" : "No Delivery"}</div>

            {/* {isAuthor && post.messages && (
              <div>
                <h4>Messages</h4>
                {post.messages.map((message) => (
                  <div key={message._id}>
                    <div>{message.content}</div>
                    <div>{message.fromUser?.username}</div>
                  </div>
                ))}
              </div>
            )} */}

            {isLoggedIn && isAuthor && (
              <>
                <button onClick={() => handleDelete(post._id)}>Delete Post</button>
                <button>See Messages</button>
              </>
            )}

            {isLoggedIn && !isAuthor && (
              <>
                <button>Contact Seller</button>
                <button>Make Offer</button>
              </>
            )}
          </div>
        );
      })}
    </>
  );
};

export default RenderAllPosts;