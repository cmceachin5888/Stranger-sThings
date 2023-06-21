import React, { useState } from "react";
import { postMessage } from "../api";
import { useParams } from "react-router-dom";

export const MessagesForm = () => {
  const [message, setMessage] = useState("");
  const { postId } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!message) {
      console.error("Please enter a message.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const result = await postMessage(postId, token, message);

      console.log("Sent Message:", result);

      setMessage("");
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <div id="container">
      <div id="navbar">Send a Message</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Message:</label>
        <textarea
          placeholder="Enter your message"
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default MessagesForm;
