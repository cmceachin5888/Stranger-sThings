import React, { useState } from "react";
import { updatePost } from "../api";
import { useNavigate } from "react-router-dom";

const UpdatePostForm = ({
  // loading,
  setLoading,
  isLoggedIn,
  setIsLoggedIn,
  posts,
  setPosts,
}) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);

  const handleSubmit = (event) => {
    if (!title || !description || !price || !location) {
      console.error("Please fill in all the required fields");
      return;
    }

    setIsLoggedIn(true);
    setLoading(true);
    event.preventDefault();

    const updatePostData = async () => {
      try {
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

        const updatePosts = [...posts, result];
        // console.log("Previous posts:", posts);
        // console.log("New posts:", newPosts);

        setPosts(updatePosts);
        setTitle("");
        setDescription("");
        setPrice("");
        setLocation("");
        setWillDeliver(false);
      } catch (error) {
        console.error("Post was not finalized", error);
      } finally {
        setLoading(false);
        navigate("/");
      }
    };
    updatePostData();
  };

  return (
    <div id="container">
      <div id="navbar">Feel free to update your post!</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Title">*Title:</label>
        <input
          placeholder={"Title"}
          type="text"
          name="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <label htmlFor="Description">*Description:</label>
        <input
          placeholder={"Description"}
          type="text"
          name="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
        <label htmlFor="Price">*Price:</label>
        <input
          placeholder={"Price"}
          type="text"
          name="Price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          required
        />
        <label htmlFor="Location">*Location:</label>
        <input
          placeholder={"Location"}
          type="text"
          name="Location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          required
        />
        <label htmlFor="WillDeliver">Will Deliver?:</label>
        <input
          type="Checkbox"
          name="WillDeliver"
          value="true"
          checked={willDeliver}
          onChange={(event) => setWillDeliver(event.target.checked)}
        />
        <button type="submit">Update Post</button>
      </form>
      <div>{alert(errorMessage)}</div>
    </div>
  );
};

export default UpdatePostForm;
