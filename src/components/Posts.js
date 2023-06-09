import React, { useEffect } from "react";
import { fetchPosts } from "../api";

export const renderAllPosts = ({ posts, setPosts}) => {

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const result = await fetchPosts();
        setPosts(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostsData();
  }, []);

  return (
    <>
      <h1>Posts</h1>
      {posts.map((post) => {
          return (
            <div className="posts" key={post._id}>
              <h3>{post.title}</h3>
              <div>{post.description}</div>
              <div>{post.price}</div>
              <div>{post.location}</div>
              <div>{post.willDeliver}</div>
            </div>
          );
        })}
    </>
  );
};
export default renderAllPosts;


