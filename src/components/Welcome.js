import React from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";

const Welcome = () => {
  const googleSignIn = async () => {};

  return (
    <main className="welcome">
      <h2>Welcome to React Multi-Chat App.</h2>
      <img src="/logo512.png" alt="ReactJs logo" width={50} height={50} />
      <p>Sign in with Google to chat with with your fellow React Developers.</p>
      <button className="sign-in" type="button" onClick={googleSignIn}>
        <img src={GoogleSignin} alt="sign in with google" />
      </button>
    </main>
  );
};

export default Welcome;
