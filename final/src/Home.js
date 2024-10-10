import "./App.css";
import NavBar from "./components/NavBar";
import ChatRooms from "./components/ChatRooms";

function Home() {
  return (
    <div className="App">
      <NavBar />
      <ChatRooms />
    </div>
  );
}

export default Home;
