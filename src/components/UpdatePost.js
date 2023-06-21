import React, { useState, useEffect } from "react";
import { updatePost, fetchPosts } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Box, TextField, Checkbox, FormControlLabel } from "@mui/material";

const UpdatePostForm = ({ setLoading }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchPostsData = async () => {
      const result = await fetchPosts(token);
      const posts = result;

      const singlePost = posts.find((post) => post._id === postId);
      if (singlePost) {
        setPost(singlePost);
        setTitle(singlePost.title);
        setDescription(singlePost.description);
        setPrice(singlePost.price);
        setLocation(singlePost.location);
        setWillDeliver(singlePost.willDeliver);
      }
      setLoading(false);
    };
    fetchPostsData();
  }, [postId]);

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

      setPost(result);
      console.log(result);
      navigate(`/ViewPost/${postId}`);
    } catch (error) {
      console.error("Failed to update the post", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="container">
      <div id="navbar">
        Feel free to update your post!
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

export default UpdatePostForm;
