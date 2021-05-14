import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/components.css';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button id='login-button' onClick={() => loginWithRedirect({
    redirectUri: 'http://localhost:3000/admin'
  })}>Log In</button>;
};

export default LoginButton;