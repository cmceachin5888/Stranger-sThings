import React, { useEffect, useState } from "react";
import { fetchUserData } from "../api";

const Profile = () => {
  const [messagesToUser, setMessagesToUser] = useState([]);
  const [messagesFromUser, setMessagesFromUser] = useState([]);

  useEffect(() => {
    const fetchMessageData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetchUserData(token);
          console.log(response);

          if (response.success) {
            const messages = response.data.messages;
            const userId = response.data._id;

            if (messages && Array.isArray(messages)) {
              const messagesToCurrentUser = messages.filter(
                (message) => message.post.author._id === userId
              );

              const messagesFromCurrentUser = messages.filter(
                (message) => message.fromUser._id === userId
              );

              setMessagesToUser(messagesToCurrentUser);
              setMessagesFromUser(messagesFromCurrentUser);
            } else {
              console.log("No messages found or messages is not an array");
            }
          } else {
            console.log("Failed to fetch user data:", response.error);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchMessageData();
  }, [setMessagesToUser, setMessagesFromUser]);

  return (
    <div>
      <h1>Profile</h1>
      <h2>Messages to You</h2>
      <ul>
        {messagesToUser.map((message) => (
          <li key={message._id}>
            <p>Message: {message.content}</p>
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
            <p>Message: {message.content}</p>
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
