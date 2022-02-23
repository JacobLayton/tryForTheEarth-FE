import React from "react";
import { Link } from "react-router-dom";
import '../styles/components.css';
import { titleToUrlHelper } from '../helpers/helperFunctions.js';
import { useAuth0 } from "@auth0/auth0-react";

const AdminInfo = (props) => {
    const { logout } = useAuth0();
    let urlVar = '/admin'
    if (props.postId && props.postTitle) {
        const urlFriendlyTitle = titleToUrlHelper(props.postTitle);
        urlVar = `/adminpost/${props.postId}/${urlFriendlyTitle}`;
    }
  return (
      <div className='admin-info-container'>
          <span>Edits can only be made in the admin section</span>
          <Link to={urlVar}>
            <button>Back to Admin</button>
          </Link>
        <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
      </div>
  )
};

export default AdminInfo;