import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/blog-post.css';
import { useAuth0 } from "@auth0/auth0-react";

function BlogPost({ match }) {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const {
        params: {id},
    } = match;
    // const [isLoading, setIsLoading] = useState(true);
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        let mounting = true;
		axios.get(`http://localhost:9001/posts/${id}`)
			.then(res =>  {
				console.log('API CALLED', res);
                if(mounting) {
                    setPostData(res.data[0]);
                }
			})
			.catch(err => {
				console.log('Error in get request', err);
			})
        return () => mounting = false;
	    }, []);

      if (isLoading) {
        return <div> LOADING.... </div>;
      }


  return (
    isAuthenticated ? (
        <div className='blog-post-container'>
            <button>Edit</button>
            <button>Delete</button>
            <h1>{postData.title}</h1>
            <h5>{postData.category}</h5>
            <h5>{postData.created_date}</h5>
            <img src={postData.image_url} alt=""/>
            <p>{postData.content}</p>
        </div>
    ) : (
        <div className='blog-post-container'>
            <h1>{postData.title}</h1>
            <h5>{postData.category}</h5>
            <h5>{postData.created_date}</h5>
            <img src={postData.image_url} alt=""/>
            <p>{postData.content}</p>
        </div>
    )
  )
}

export default BlogPost;