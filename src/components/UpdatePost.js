import React, { useState, useEffect } from "react";
import { updatePost } from "../api";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePostForm = ({ setLoading, posts, setPosts }) => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);

  useEffect(() => {
    const post = posts.find((post) => post._id === postId);
    if (post) {
      setTitle(post.title);
      setDescription(post.description);
      setPrice(post.price);
      setLocation(post.location);
      setWillDeliver(post.willDeliver);
    }
  }, [postId, posts]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !description || !price || !location) {
      console.error("Please fill in all the required fields");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const result = await updatePost(
        postId,
        token,
        title,
        description,
        price,
        location,
        willDeliver
      );

      console.log("Updated result:", result);

      const updatedPosts = posts.map((post) =>
        post._id === postId ? result : post
      );

      setPosts(updatedPosts);
      navigate("/");
    } catch (error) {
      console.error("Failed to update the post", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="container">
      <div id="navbar">Feel free to update your post!</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Title">*Title:</label>
        <input
          placeholder="Title"
          type="text"
          name="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <label htmlFor="Description">*Description:</label>
        <input
          placeholder="Description"
          type="text"
          name="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
        <label htmlFor="Price">*Price:</label>
        <input
          placeholder="Price"
          type="text"
          name="Price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          required
        />
        <label htmlFor="Location">*Location:</label>
        <input
          placeholder="Location"
          type="text"
          name="Location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          required
        />
        <label htmlFor="WillDeliver">Will Deliver?:</label>
        <input
          type="checkbox"
          name="WillDeliver"
          checked={willDeliver}
          onChange={(event) => setWillDeliver(event.target.checked)}
        />
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default UpdatePostForm;
