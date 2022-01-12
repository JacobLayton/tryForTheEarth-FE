import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/components.css';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button id='login-button' onClick={() => loginWithRedirect({
    redirectUri: process.env.REACT_APP_ADMIN_URL
  })}>Log In</button>;
};

export default LoginButton;