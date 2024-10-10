import { useState } from "react";
import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";
import ChatRoomRoutes from "./ChatRoomRoutes";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <div className="App">
        <NavBar />
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return user ? (
    <div className="App">
      <ChatRoomRoutes />
    </div>
  ) : (
    <div className="App">
      <NavBar />
      <Welcome />
    </div>
  );
}

export default App;
