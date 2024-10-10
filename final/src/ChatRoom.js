import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";

export default function ChatRoom() {
  const { chatRoomId } = useParams();

  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    const q = query(
      collection(db, "chatRooms", chatRoomId, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, [chatRoomId]);

  return (
    <>
      <NavBar chatRoomId={chatRoomId} />
      <ChatBox messages={messages} scroll={scroll} chatRoomId={chatRoomId} />
    </>
  );
}
