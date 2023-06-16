import React, { useEffect } from "react";
import { fetchPosts, deletePost } from "../api";

export const RenderAllPosts = ({ posts, setPosts, currentUser }) => {
  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const token = localStorage.getItem("token");
        const result = await fetchPosts(token);
        setPosts(result);
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
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      <h1>Posts</h1>
      {posts.map((post) => {
        if (!post) {
          return null;
        }

        const isAuthor = post.isAuthor === true && currentUser === post.author?.username;
        const isLoggedIn = !!currentUser;

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


            {isAuthor && isLoggedIn && (
              <>
                <button onClick={() => handleDelete(post._id)}>Delete Post</button>
              </>
            )}

            {!isAuthor && isLoggedIn && (
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

export default renderAllPosts;