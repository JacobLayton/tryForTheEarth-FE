import React from "react";
import LogoutButton from '../components/Logout-Button';
import { useAuth0 } from "@auth0/auth0-react";


function Admin(props) {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div> LOADING.... </div>;
  }

  return (
    isAuthenticated ? (
      <div>
        <h1>Admin Page</h1>
        <img src={user.picture} alt={user.name} />
        <h2>Hello {user.name}</h2>
        <p>{user.email}</p>
        <LogoutButton />
      </div>
    ) :
    <div>
      <h1>This page is for administrators only.</h1>
    </div>
  );
};

export default Admin;