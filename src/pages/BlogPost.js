import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../styles/blog-post.css';
import { useAuth0 } from "@auth0/auth0-react";
import moment from 'moment';
import AdminInfo from '../components/AdminInfo';
import LoadingSpinner from '../components/LoadingSpinner';

function BlogPost({ match }) {
    const { isAuthenticated, isLoading } = useAuth0();
    const {
        params: {id},
    } = match;

    const [postData, setPostData] = useState([]);
    const [responseLoaded, setReponseLoaded] = useState(false);
    let displayCategory;
    let categoryPath;
    if (postData.category === 'product_reviews') {
        displayCategory = 'Product Mentions';
        categoryPath = 'product_mentions'
    } else if (postData.category === 'lifestyle') {
        displayCategory = 'Lifestyle';
        categoryPath = 'lifestyle';
    } else if (postData.category === 'for_the_home') {
        displayCategory = 'Homemade';
        categoryPath = 'homemade';
    } else {
        displayCategory = 'General';
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        let mounting = true;
		axios.get(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`)
			.then(res =>  {
                if(mounting) {
                    const rawPostData = res.data[0];
                    const createdDate = moment(rawPostData.created_date).format('MMMM Do, YYYY');
                    rawPostData.created_date = createdDate;
                    const updatedDate = rawPostData.updated_date ? moment(rawPostData.updated_date).format('MMMM Do, YYYY') : createdDate;
                    rawPostData.updated_date = updatedDate;
                    setPostData(rawPostData);
                    setReponseLoaded(true);
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
    responseLoaded ? (
        <div className='blog-post-container'>
            <div className='blog-post-container-desktop'>
                {isAuthenticated ?
                <AdminInfo postId={id} postTitle={postData.title}/> : null}
                <h1>{postData.title}</h1>
                <div className='blog-post-info-desktop'>
                    <h5><Link to={`/${categoryPath}`}>{displayCategory}</Link></h5>
                    <span>|</span>
                    <h5>{postData.created_date}</h5>
                </div>
                <div className='blog-post-image-desktop'>
                    <img src={postData.image_url} alt=""/>
                </div>
                <div className='blog-post-info-mobile'>
                    <h5><Link to={`/${categoryPath}`}>{displayCategory}</Link></h5>
                    <h5>{postData.created_date}</h5>
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.content }} className="post-data"/>
                <span className='last-updated-span'>Last Updated: {postData.updated_date}</span>
            </div>
        </div>
    ) : (<LoadingSpinner />)
  )
}

export default BlogPost;