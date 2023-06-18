import React, { useEffect, useState } from "react";
import { fetchPosts, deletePost, fetchUserData } from "../api"; 

const RenderAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          setIsLoggedIn(true);
          const userData = await fetchUserData(token); 
          setUserId(userData.data._id); 
        }
        console.log("Token:", token);
        const result = await fetchPosts(token);
        setPosts(result);
        setIsLoading(false);
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

  console.log("isLoggedIn:", isLoggedIn);
  console.log("posts:", posts);

  return (
    <>
      <h1>Posts</h1>
      {posts.map((post) => {
        if (!post) {
          return null;
        }

        const isAuthor = post.author._id === userId;

        console.log("Logged-in User ID:", userId);
        console.log("Author ID:", post.author._id);

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

            {isAuthor && (
              <>
                <button onClick={() => handleDelete(post._id)}>Delete Post</button>
                <button>See Messages</button>
              </>
            )}

            {!isAuthor && (
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