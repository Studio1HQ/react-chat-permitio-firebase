import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import permissions from "../utils/permissions";

const SendMessage = ({ scroll, chatRoomId }) => {
  const [user] = useAuthState(auth);
  const userId = user?.uid || "";
  const [isPermitted, setIsPermitted] = useState(false);

  const [message, setMessage] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    if (!user) {
      console.error("User not authenticated. Cannot delete message.");
      return;
    }

    if (!chatRoomId || !message) {
      console.error("Invalid chat room ID or message. Cannot send message.");
      return;
    }

    try {
      // Get the user's ID token
      const token = await user.getIdToken();

      await fetch(
        "http://127.0.0.1:5001/react-chat-3ae5d/us-central1/sendMessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ data: { chatRoomId, message } }),
        }
      );

      setMessage("");
      scroll.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error sending message:", error);
      throw new Error("Failed to send message. Please try again.");
    }
  };

  useEffect(() => {
    const checkUserPermission = async () => {
      if (userId && chatRoomId) {
        try {
          const canCreate = await permissions(userId, "create", chatRoomId);

          setIsPermitted(canCreate.permitted);
        } catch (error) {
          console.error("Failed to check permissions:", error);
          setIsPermitted(false);
        }
      }
    };

    checkUserPermission();
  }, [userId, chatRoomId]);

  console.log(isPermitted);

  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={!isPermitted}
      />
      <button type="submit" disabled={!isPermitted}>
        Send
      </button>
    </form>
  );
};

export default SendMessage;
