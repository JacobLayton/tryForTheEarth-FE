import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/components.css';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button id='logout-button' onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

export default LogoutButton;