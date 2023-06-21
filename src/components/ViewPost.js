import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPosts, deletePost, postMessage, fetchUserData } from "../api";
import { Loading } from "./Loading";
import { MessagesForm } from "./MakePostMessages";

const ViewPost = ({
  isLoggedIn,
  loading,
  setLoading,
  userData,
  setUserData,
  posts,
  // setPosts,
}) => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [messages, setMessages] = useState([]);
  // const [userData, setUserData] = useState(null);
  // const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [content, setContent] = useState("");

  console.log("userData", userData);
  useEffect(() => {
    setLoading(true);
    if (Array.isArray(userData?.messages)) {
      // Convert messages to an array
      const messagesResult = userData.messages.filter(
        (message) => message.post._id === postId
        // (message.fromUser?._id === userData._id &&
        //   message.toUser?._id === post.author?._id) ||
        // (message.fromUser?._id === post.author?._id &&
        //   message.toUser?._id === userData._id)
      );

      console.log("Messages:", messagesResult);
      setMessages(messagesResult);
    } else {
      console.log("No messages found.");
      setMessages([]);
    }
    setLoading(false);
  }, [userData]);

  useEffect(() => {
    // const fetchData = async () => {
    setLoading(true);

    // console.log("Fetching post...");
    // const userDataResult = await fetchUserData(token);

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
      const token = localStorage.getItem("token");
      const response = await postMessage(token, postId, content);
      console.log("Message sent successfully");
      console.log(response);

      const userDataResult = await fetchUserData(token);
      console.log("Updated user data:");
      console.log(userDataResult);
      setUserData(userDataResult);

      // if (userDataResult.success) {
      if (Array.isArray(userDataResult?.messages)) {
        // Convert messages to an array
        const messagesResult = userDataResult.messages.filter(
          (message) =>
            (message.fromUser?._id === userDataResult._id &&
              message.toUser?._id === post.author?._id) ||
            (message.fromUser?._id === post.author?._id &&
              message.toUser?._id === userDataResult._id)
        );

        console.log("Messages:", messagesResult);
        setMessages(messagesResult);

        // setMessagesToUser(messagesToCurrentUser);
        // setMessagesFromUser(messagesFromCurrentUser);
      } else {
        console.log("No messages found or messages is not an array");
      }
      // } else {
      //   console.log("Failed to update user data:", userDataResult.error);
      // }
    } catch (error) {
      console.error("Failed to send message:", error);
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
                From: {message.fromUser?.username}, To:{" "}
                {message.toUser?.username}
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

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {post && renderPostDetails()}
      {!isLoggedIn ? (
        <p>Please log in to interact with the post and send messages.</p>
      ) : post?.author?._id === userData._id ? (
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
