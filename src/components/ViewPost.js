import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deletePost, postMessage, fetchUserData, fetchPosts } from "../api";
import { Loading } from "./Loading";
import { Button } from "@mui/material";
import Delete from '@mui/icons-material/Delete';
import Send from '@mui/icons-material/Send';


const ViewPost = ({ loading, setLoading }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchPostData = async () => {
      const result = await fetchPosts(token);
      const posts = result;

      if (posts.length > 0) {
        const postById = posts.find((post) => post._id === postId);

        if (postById) {
          setPost(postById);
        } else {
          throw new Error("Post not found");
        }
      } else {
        throw new Error("Post not found");
      }
      setLoading(false);
    };
    fetchPostData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await deletePost(token, postId);
      navigate("/");
    } catch (error) {
      setError("Failed to delete post.");
    }
  };

  const handleEdit = () => {
    navigate(`/UpdatePost/${postId}`);
  };

  const handleMessage = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await postMessage(token, postId, content);
      console.log("Message sent successfully");
      console.log(response);

      const userDataResult = await fetchPosts(token);
      const posts = userDataResult;
      if (posts.length > 0) {
        const postById = posts.find((post) => post._id === postId);

        if (postById) {
          setPost(postById);
        } else {
          throw new Error("Post not found");
        }
      } else {
        throw new Error("Post not found");
      }
    } catch (err) {
      console.error("couldn't fetch posts", err);
    } finally {
      setLoading(false);
      setContent("");
    }
  };

  {
    loading ? <Loading /> : null;
  }

  const renderPostDetails = () => {
    return (
      <div>
        <h2>{post.title}</h2>
        <p>Author: {post.author?.username || "Unknown"}</p>
        <p>Description: {post.description}</p>
        <p>Price: {post.price}</p>
        <p>Location: {post.location}</p>
        <p>Will Deliver: {post.willDeliver ? "Yes" : "No"}</p>
        {token && post.isAuthor && (
          <>
            <Button
              variant="contained"
              size="small"
              onClick={handleEdit}>Edit</Button>
            <Button
              variant="contained"
              size="small"
              startIcon={<Delete />}
              onClick={handleDelete}>Delete</Button>
          </>
        )}
      </div>
    );
  };

  const renderMessageForm = () => {
    return (
      <div>
        <h3>Send Message</h3>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message here..."
        ></textarea>
        <Button 
          variant="contained"
          size="small"
          endIcon={<Send />}
          onClick={handleMessage}>Send</Button>
      </div>
    );
  };

  const renderMessages = () => {

    return (
      <div>
        <h3>Messages</h3>
        {post.messages.length > 0 ? (
          post.messages.map((message) => (
            <div key={message._id}>
              <p>To: {post.author.username}</p>
              <p>From: {message.fromUser?.username}</p>

              <p>{message.content}</p>
            </div>
          ))
        ) : (
          <p>No messages found.</p>
        )}
      </div>
    );
  };

  if (!post) {
    return null;
  }

  return (
    <div>
      {post && renderPostDetails()}
      {!token ? (
        <p>Please log in to interact with the post and send messages.</p>
      ) : post.isAuthor ? (
        renderMessages()
      ) : (
        <>
          {renderMessageForm()}
          {renderMessages()}
        </>
      )}
    </div>
  );
};

export default ViewPost;
