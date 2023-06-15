import React, { useEffect } from "react";
import { makePost } from "../api";

export const newPostForm = ({
  posts,
  setPosts,
  loading,
  setLoading,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const token = localstorage.getItem("token");

  const handleSubmit = (event) => {
    if (!title || !description || !price || !willDeliver) {
      return;
    }

    setLoading(true);
    event.preventDefault();

    const makePostData = async () => {
      try {
        const result = await makePost(
          token,
          title,
          description,
          price,
          willDeliver
        );
        //const updatedArray = posts.map((post) => post).push(result)
        //setPosts(updatedArray)
        // setPosts([...posts, result]);
        setTitle("");
        setDescription("");
        setPrice("");
        setLocation("");
        setWillDeliver(false);
      } catch (error) {
        console.error("Post was not finalized", error);
      }
    };
    makePostData();
  };

  fetchPostsData();

  return (
    <>
      <h1>Posts</h1>
      {posts.map((post) => {
        return (
          <div className="posts" key={post._id}>
            <h3>{post.title}</h3>
            <div>{post.author.username}</div>
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

export default newPostForm;
