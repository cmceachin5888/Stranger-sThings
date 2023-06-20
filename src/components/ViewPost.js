import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPosts, deletePost, postMessage, fetchUserData } from "../api";

const ViewPost = ({ isLoggedIn }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        console.log("Fetching post...");
        const [postResult, userDataResult] = await Promise.all([
          fetchPosts(postId, token),
          fetchUserData(token),
        ]);

        if (postResult && postResult.length > 0) {
          const postById = postResult.find((post) => post._id === postId);
          if (postById) {
            setPost(postById);
          } else {
            throw new Error("Post not found");
          }
        } else {
          throw new Error("Post not found");
        }

        console.log("Post:", post);
        setUserData(userDataResult);
        console.log("UserData:", userDataResult);

        if (Array.isArray(userDataResult?.messages)) {
          // Convert messages to an array
          const messagesResult = userDataResult.messages.filter(
            (message) =>
              (message.fromUser?._id === userId && message.toUser?._id === post.author?._id) ||
              (message.fromUser?._id === post.author?._id && message.toUser?._id === userId)
          );

          console.log("Messages:", messagesResult);
          setMessages(messagesResult);
        } else {
          console.log("No messages found.");
          setMessages([]);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
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
    const response = await sendMessage(token, postId, message);
    console.log("Message sent successfully");
    console.log(response);

    const userDataResult = await fetchUserData(token);
    console.log("Updated user data:");
    console.log(userDataResult);

    if (userDataResult.success) {
      const { data } = userDataResult;
      if (data.messages && Array.isArray(data.messages)) {
        const messagesToCurrentUser = data.messages.filter(
          (message) => message.toUser._id === data._id
        );

        const messagesFromCurrentUser = data.messages.filter(
          (message) => message.fromUser._id === data._id
        );

        setMessagesToUser(messagesToCurrentUser);
        setMessagesFromUser(messagesFromCurrentUser);
      } else {
        console.log("No messages found or messages is not an array");
      }
    } else {
      console.log("Failed to update user data:", userDataResult.error);
    }
  } catch (error) {
    console.error("Failed to send message:", error);
  }
};

  const renderPostDetails = () => {
    return (
      <div>
        <h2>{post.title}</h2>
        <p>Author: {post.author?.username || "Unknown"}</p>
        <p>Description: {post.description}</p>
        <p>Price: {post.price}</p>
        <p>Location: {post.location}</p>
        <p>Will Deliver: {post.willDeliver ? "Yes" : "No"}</p>
        {isLoggedIn && post.author?._id === localStorage.getItem("userId") && (
          <>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
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
        <button onClick={handleMessage}>Send</button>
      </div>
    );
  };

  const renderMessages = () => {
    return (
      <div>
        <h3>Messages</h3>
        {messages.length > 0 ? (
          messages.map((message) => (
            <div key={message._id}>
              <p>
                From: {message.fromUser?.username}, To: {message.toUser?.username}
              </p>
              <p>{message.content}</p>
            </div>
          ))
        ) : (
          <p>No messages found.</p>
        )}
      </div>
    );
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {post && renderPostDetails()}
      {!isLoggedIn ? (
        <p>Please log in to interact with the post and send messages.</p>
      ) : post?.author?._id === localStorage.getItem("userId") ? (
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