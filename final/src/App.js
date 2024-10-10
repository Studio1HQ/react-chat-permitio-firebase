import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";
import ChatRoomRoutes from "./ChatRoomRoutes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
