import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../styles/blog-post.css';
import { useAuth0 } from "@auth0/auth0-react";
import moment from 'moment';

function BlogPost({ match }) {
    const { isAuthenticated, isLoading } = useAuth0();
    const {
        params: {id},
    } = match;
    // const [isLoading, setIsLoading] = useState(true);
    const [postData, setPostData] = useState([]);
    let displayCategory;
    if (postData.category === 'product_reviews') {
        displayCategory = 'Product Review';
    } else if (postData.category === 'lifestyle') {
        displayCategory = 'Lifestyle';
    } else if (postData.category === 'for_the_home') {
        displayCategory = 'For The Home';
    } else {
        displayCategory = 'General';
    }

    useEffect(() => {
        let mounting = true;
		axios.get(`http://localhost:9001/posts/${id}`)
			.then(res =>  {
				console.log('API CALLED', res);
                if(mounting) {
                    const rawPostData = res.data[0];
                    const createdDate = moment(rawPostData.created_date).format('MMMM Do, YYYY');
                    rawPostData.created_date = createdDate;
                    setPostData(rawPostData);
                    
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
    <div className='blog-post-container'>
        <h1>{postData.title}</h1>
        <img src={postData.image_url} alt=""/>
        <h5><Link to={`/category/${postData.category}`}>{displayCategory}</Link></h5>
        <h5>{postData.created_date}</h5>
        <div dangerouslySetInnerHTML={{ __html: postData.content }} className="post-data"/>
    </div>
  )
}

export default BlogPost;