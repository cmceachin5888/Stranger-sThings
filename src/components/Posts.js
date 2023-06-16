import React, { useEffect, useState } from "react";
import { fetchPosts, deletePost } from "../api";

const RenderAllPosts = ({ currentUser, isLoggedIn }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const token = localStorage.getItem("token");
        const result = await fetchPosts(token);
        console.log("Token:", token);
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

  console.log("currentUser:", currentUser);
console.log("isLoggedIn:", isLoggedIn);
  return (
    <>
      <h1>Posts</h1>
      {posts.map((post) => {
        if (!post) {
          return null;
        }

        const isAuthor =
          post.author && currentUser && post.author.username === currentUser.username;

        return (
          <div className="posts" key={post._id}>
            <h3>{post.title}</h3>
            <div>{post.author?.username}</div>
            <div>{post.description}</div>
            <div>{post.price}</div>
            <div>{post.location}</div>
            <div>{post.willDeliver ? "Will Deliver" : "No Delivery"}</div>

            {isAuthor && post.messages && (
              <div>
                <h4>Messages</h4>
                {post.messages.map((message) => (
                  <div key={message._id}>
                    <div>{message.content}</div>
                    <div>{message.sender?.username}</div>
                  </div>
                ))}
              </div>
            )}

            {isAuthor && currentUser && currentUser.username === post.author?.username && (
              <button onClick={() => handleDelete(post._id)}>Delete Post</button>
            )}

            {!isAuthor && isLoggedIn && currentUser && (
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