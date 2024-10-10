import React from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";

const ChatBox = ({ messages, scroll, chatRoomId }) => {
  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message key={message.id} message={message} chatRoomId={chatRoomId} />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} chatRoomId={chatRoomId} />
    </main>
  );
};

export default ChatBox;
