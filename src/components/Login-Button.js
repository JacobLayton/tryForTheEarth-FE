import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/components.css';

const LoginButton = () => {
  const { loginWithPopup } = useAuth0();

  return <button id='login-button' onClick={() => loginWithPopup({
    redirectUri: 'https://www.tryfortheearth.com/admin'
  })}>Log In</button>;
};

export default LoginButton;