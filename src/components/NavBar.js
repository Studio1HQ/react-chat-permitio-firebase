import React from "react";
import GoogleSignIn from "../img/btn_google_signin_dark_pressed_web.png";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const NavBar = ({ chatRoomId }) => {
  const [user] = useAuthState(auth);

  const googleSignIn = async () => {};

  const signOut = () => {};

  return (
    <nav className="nav-bar">
      <h1>
        <a href="/">React Multi-Chat</a>
      </h1>

      <div className="nav-bar__center">
        {chatRoomId && <h2 className="chat-name">{chatRoomId + " room"}</h2>}
      </div>

      {!user ? (
        <button className="sign-in" type="button" onClick={googleSignIn}>
          <img src={GoogleSignIn} alt="sign in with google" />
        </button>
      ) : (
        <button className="sign-out" type="button" onClick={signOut}>
          Sign Out
        </button>
      )}
    </nav>
  );
};

export default NavBar;
