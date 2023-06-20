import React, { useEffect } from "react";
import { fetchUserData } from "../api";

const Profile = ({
  token,
  userData,
  setUserData,
  messagesToUser,
  setMessagesToUser,
  messagesFromUser,
  setMessagesFromUser,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserData(token);
        if (response.success) {
          const { data, messages } = response;
          setUserData(data);

          if (messages && Array.isArray(messages)) {
            const messagesToCurrentUser = messages.filter(
              (message) => message.toUser._id === data._id
            );

            const messagesFromCurrentUser = messages.filter(
              (message) => message.fromUser._id === data._id
            );

            setMessagesToUser(messagesToCurrentUser);
            setMessagesFromUser(messagesFromCurrentUser);
          } else {
            console.log("No messages found or messages is not an array");
          }
        } else {
          console.log("Failed to fetch user data:", response.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token, setUserData, setMessagesToUser, setMessagesFromUser]);

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