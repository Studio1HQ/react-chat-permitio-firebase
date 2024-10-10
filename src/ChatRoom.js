import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";

export default function ChatRoom() {
  const { chatRoomId } = useParams();

  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  return (
    <>
      <NavBar chatRoomId={chatRoomId} />
      <ChatBox messages={messages} scroll={scroll} chatRoomId={chatRoomId} />
    </>
  );
}
