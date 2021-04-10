import React from "react";
import { Link } from "react-router-dom";
import CreatePostForm from "../components/CreatePostForm";

function CreatePost(props) {
  return (
      <div>
          <h1>Create Post</h1>
          <CreatePostForm />
          <Link to='/admin'>
            <button>Cancel</button>
          </Link>
      </div>
  )
}

export default CreatePost;