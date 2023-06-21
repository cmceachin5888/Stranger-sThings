import React, { useState } from "react";
import { makePost } from "../api";
import { useNavigate } from "react-router-dom";
import { Button, Box, TextField, Checkbox, FormControlLabel } from "@mui/material";

const NewPostForm = ({ setLoading }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [posts, setPosts] = useState([]);
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

    event.preventDefault();

    const makePostData = async () => {
      setLoading(true);
      try {
        const result = await makePost(
          token,
          title,
          description,
          price,
          location,
          willDeliver
        );

        console.log("New post result:", result);

        const newPosts = [...posts, result];
        console.log("Previous posts:", posts);
        console.log("New posts:", newPosts);

        setPosts(newPosts);
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
    makePostData();
  };

  return (
    <div id="container">
      <div id="navbar">
        Feel free to add your new product here! Fields with a star are required!
      </div>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
          <FormControlLabel control={
            <Checkbox
              onChange={(event) => setWillDeliver(event.target.checked)}
            />}
            checked={willDeliver}
            label="Will Deliver?" 
          />
          <br></br>
          <Button
            variant="contained"
            size="small"
            type="submit"
            onClick={handleSubmit}>Submit Post</Button>
        </div>
      </Box>
    </div>
  );
};

export default NewPostForm;
