import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ChatRoom from "./ChatRoom";

function ChatRoomRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/chat/:chatRoomId" element={<ChatRoom />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default ChatRoomRoutes;
