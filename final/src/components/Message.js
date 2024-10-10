import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Timestamp } from "firebase/firestore";
import { format } from "date-fns";
import permissions from "../utils/permissions";

const Message = ({ message, chatRoomId }) => {
  const [user] = useAuthState(auth);
  const userId = user?.uid || "";
  const [isPermitted, setIsPermitted] = useState(false);

  const formatTimestampToDate = (timestampObj) => {
    const { seconds, nanoseconds } = timestampObj;
    const timestamp = new Timestamp(seconds, nanoseconds);

    return format(timestamp.toDate(), "do MMM',' yyyy");
  };

  const deleteMessage = async () => {
    if (!user) {
      console.error("User not authenticated. Cannot delete message.");
      return;
    }

    if (!chatRoomId || !message.id) {
      console.error(
        "Invalid chat room ID or message ID. Cannot delete message."
      );
      return;
    }

    try {
      // Get the user's ID token
      const token = await user.getIdToken();

      await fetch(
        "http://127.0.0.1:5001/react-chat-3ae5d/us-central1/deleteMessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ data: { chatRoomId, messageId: message.id } }),
        }
      );

      console.log("Message deleted successfully.");
    } catch (error) {
      console.error("Error deleting message:", error);
      throw new Error("Failed to delete message. Please try again.");
    }
  };

  useEffect(() => {
    const checkUserPermission = async () => {
      if (userId && chatRoomId) {
        try {
          const canDelete = await permissions(userId, "delete", chatRoomId);
          setIsPermitted(canDelete.permitted);
        } catch (error) {
          console.error("Failed to check permissions:", error);
          setIsPermitted(false);
        }
      }
    };

    checkUserPermission();
  }, [userId, chatRoomId]);

  return (
    <div className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
      <div className="chat-bubble__details">
        <img
          className="chat-bubble__left"
          src={message.avatar}
          alt="user avatar"
        />
        <div className="chat-bubble__right">
          <p className="user-name">{message.name}</p>
          <p className="user-message">{message.text}</p>
        </div>
      </div>

      <div className="chat-bubble__bottom">
        <p className="chat-bubble__date">
          {message.createdAt ? formatTimestampToDate(message.createdAt) : ""}
        </p>

        {isPermitted && (
          <button
            className="chat-bubble__delete"
            type="button"
            onClick={deleteMessage}>
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path
                fill-rule="evenodd"
                d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Message;
