import React, { useState } from "react";
import { makePost } from "../api";

export const newPostForm = ({
  // loading,
  setLoading,
  // isLoggedIn,
  // setIsLoggedIn,
  posts,
  setPosts
}) => {
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

    setLoading(true);
    event.preventDefault();

    const makePostData = async () => {
      const token = localStorage.getItem("token");
      try {
        const result = await makePost(
          token,
          title,
          description,
          price,
          location,
          willDeliver
        );

        setPosts([...posts, result]);
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

  // const handleChange = (event) => {
  //   setTitle(event.target.value);
  //   setDescription(event.target.value);
  //   setPrice(event.target.value);
  //   setLocation(event.target.value);
  //   setWillDeliver(event.target.value);
  // };

  return (
    <div id="container">
      <div id="navbar">Login Here!</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Title">Title:</label>
        <input
          placeholder={"Title"}
          type="text"
          name="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <label htmlFor="Description">Description:</label>
        <input
          placeholder={"Description"}
          type="text"
          name="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
        <label htmlFor="Price">Price:</label>       
        <input
          placeholder={"Price"}
          type="text"
          name="Price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          required
        />
        <label htmlFor="Location">Location:</label>
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
        <button type="submit">Submit Post</button>
      </form>
      {/* <div>{errorMessage}</div> */}
    </div>
  );
};

export default newPostForm;
