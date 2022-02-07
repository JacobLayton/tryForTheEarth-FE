import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import EditPostForm from "../components/EditPostForm";
import axios from 'axios';
import '../styles/edit-post-form.css';

function EditPost({ match }) {
    const { isAuthenticated, isLoading } = useAuth0();
    const {
        params: {id},
    } = match;
    // const [isLoading, setIsLoading] = useState(true);
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        let mounting = true;
		axios.get(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`)
			.then(res =>  {
                if(mounting) {
                    setPostData(res.data[0]);
                }
			})
			.catch(err => {
				console.log('Error in get request', err);
			})
        return () => mounting = false;
    }, [id]);

    if (isLoading) {
    return <div> LOADING.... </div>;
    }
  return (
    isAuthenticated ? (
      <div>
          <h1>Edit Post</h1>
          <EditPostForm postData={postData}/>
          <div className='cancel-post'>
            <Link to={`/adminpost/${id}`}>
              <button id='form-cancel-button'>Cancel</button>
          </ Link>
          </div>
      </div>
    ) : (
        <div className='administrators-only-section'>
            <h1>This page is for administrators only.</h1>
        </div>
    )
  )
}

export default EditPost;