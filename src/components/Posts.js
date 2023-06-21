import React, { useEffect, useState } from "react";
import { fetchPosts, fetchUserData } from "../api";
import Search from "./Search";
import { useNavigate } from "react-router-dom";

import CommonButtons from "./Common/CommonButtons";

const RenderAllPosts = ({ setLoading }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const buttonStyles = {
    fontSize: 12,
    fontWeight: 700,
    backgroundColor: "red",
    color: "black",
    "&:hover": {
      backgroundColor: "blue",
    },
  };

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
      <Search />
      <div id="postheader">Posts</div>
      {posts.map((post) => (
        <div id="posts" key={post._id}>
          <h3>{post.title}</h3>
          <div>{post.author?.username || "Unknown User"}</div>
          <div>Description: {post.description}</div>
          <div>Price: {post.price}</div>
          <div>Location: {post.location}</div>
          <div>
            Will Deliver?:{" "}
            {post.willDeliver ? "Will Deliver" : "Will NOT deliver"}
          </div>
          <br></br>
          {token && (
            <CommonButtons
              variant="contained"
              sx={buttonStyles}
              onClick={() => handleViewPost(post._id)}
            >
              View Post
            </CommonButtons>
          )}
        </div>
      ))}
    </>
  );
};

export default RenderAllPosts;