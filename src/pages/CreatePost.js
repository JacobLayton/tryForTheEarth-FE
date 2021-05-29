import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import CreatePostForm from "../components/CreatePostForm";
import '../styles/edit-post-form.css';

function CreatePost(props) {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div> LOADING.... </div>;
    }
  return (
    isAuthenticated ? (
      <div>
          <h1>Create Post</h1>
          <CreatePostForm />
          <div className='cancel-post'>
            <Link to='/admin'>
              <button id='form-cancel-button'>Cancel</button>
            </Link>
          </div>
      </div>
    ) : (
      <div className='administrators-only-section'>
            <h1>This page is for administrators only.</h1>
        </div>
    )
  )
}

export default CreatePost;