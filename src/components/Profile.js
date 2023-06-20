import React, { useEffect, useState } from "react";
import { fetchUserData } from "../api";
import { useNavigate } from "react-router-dom";

const Profile = ({
  // posts,
  // setPosts,
  // isLoading,
  // setLoading,
  // isLoggedIn,
  // setIsLoggedIn,
  // userId,
  // setUserId,
  token,
  setToken,
}) => {
  const navigate = useNavigate();
  const [messagesToUser, setMessagesToUser] = useState([]);
  const [messagesFromUser, setMessagesFromUser] = useState([]);

  useEffect(() => {
    const fetchMyMessagesData = async () => {
      try {
        const userData = fetchUserData(token);
        const { messages } = userData;
        const messagesToUser = messages.filter(
          (message) => message.fromUser._id !== userData._id
        );
        const messagesFromUser = messages.filter(
          (message) => message.fromUser._id !== userData._id
        );
        setMessagesToUser(messagesToUser);
        setMessagesFromUser(messagesFromUser);

        // if (token) {
        //   setIsLoggedIn(true);
        //   const userData = await fetchUserData(token);
        //   setUserId(userData.data._id);
        //   setMessages(userData.messages);
        // }

        // const result = await fetchPosts(token);
      } catch (error) {
        console.error("Error loading user messages", error);
      }
    };

    fetchMyMessagesData();
  }, [token]);

  return (
    <div>
      <h1>Profile</h1>
      <h2>Messages to You</h2>
      <ul>
        {messagesToUser.map((message) => (
          <li key={message._id}>
            <p>{message.content}</p>
            <p>
              Link to Post:{" "}
              <a href={`/posts/${message.post._id}`}>{message.post.title}</a>
            </p>
          </li>
        ))}
      </ul>
      <h2>Messages You Sent</h2>
      <ul>
        {messagesFromUser.map((message) => (
          <li key={message._id}>
            <p>{message.content}</p>
            <p>
              Link to Post:{" "}
              <a href={`/posts/${message.post._id}`}>{message.post.title}</a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
