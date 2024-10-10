import React from "react";
import { Link } from "react-router-dom";

const ChatRooms = () => {
  const chatRooms = [
    {
      id: "general",
      name: "General",
      description: "Chat about general topics",
    },
    {
      id: "react",
      name: "React",
      description: "Discuss React and related topics",
    },
    {
      id: "random",
      name: "Random",
      description: "Random fun conversations",
    },
  ];

  return (
    <div className="chat-rooms-grid">
      {chatRooms.map((room) => (
        <div key={room.id} className="chat-room-card">
          <h3>{room.name}</h3>
          <p>{room.description}</p>
          <Link to={`/chat/${room.id}`}>
            <button>View</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ChatRooms;
