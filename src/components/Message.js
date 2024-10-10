import React from "react";
import { Timestamp } from "firebase/firestore";
import { format } from "date-fns";

const Message = ({ message, chatRoomId }) => {
  const formatTimestampToDate = (timestampObj) => {
    const { seconds, nanoseconds } = timestampObj;
    const timestamp = new Timestamp(seconds, nanoseconds);

    return format(timestamp.toDate(), "do MMM',' yyyy");
  };

  const deleteMessage = async () => {};

  return (
    <div className={`chat-bubble`}>
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
      </div>
    </div>
  );
};

export default Message;
