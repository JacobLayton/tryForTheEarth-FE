import React, { useState, useEffect } from "react";
import { useHistory, Link } from 'react-router-dom';
import axios from "axios";
import '../styles/blog-post.css';
import { useAuth0 } from "@auth0/auth0-react";
import Modal from "react-modal";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { useMachine } from "react-robot";
import moment from 'moment';

function deletePost(postId, history, token) {
    return new Promise((resolve) => {
      axios.delete(`${process.env.REACT_APP_SERVER_URL}/posts/${postId}`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
      .then(res => {
        //   console.log('Delete complete: ', res);
          resolve();
          history.push('/admin');
      })
      .catch(err => {
          console.log('Error deleting: ', err);
      })
    });
}

function AdminPost({ match }) {
    const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const {
        params: {id},
    } = match;
    let history = useHistory();
    // const [isLoading, setIsLoading] = useState(true);
    const [postData, setPostData] = useState([]);
    const [current, send] = useMachine(ConfirmationModal);
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
		axios.get(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`)
			.then(res =>  {
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
    isAuthenticated ? (
        <div className='blog-post-container'>
            <div className='blog-post-container-desktop'>
                <div className='back-to-admin'>
                    <h3><Link to='/admin'>← Back To Admin ←</Link></h3>
                </div>
                <div className='admin-post-buttons'>
                    <Link to={`/editpost/${postData.id}`}>
                        <button className='admin-button'>Edit Post</button>
                    </ Link>
                    <button 
                        className='delete-button'
                        onClick={() =>
                            send({
                            type: 'begin',
                            onCommit: async (context, event) => {
                                if (isAuthenticated) {
                                    const token = await getAccessTokenSilently();
                                    deletePost(postData.id, history, token);
                                } else {
                                    alert('Please sign in to perform this function');
                                }
                            }
                            })
                        }
                    >
                        Delete
                    </button>
                </div>
                <h1>{postData.title}</h1>
                <div className='blog-post-info-desktop'>
                    <h5><Link to={`/category/${postData.category}`}>{displayCategory}</Link></h5>
                    <span>|</span>
                    <h5>{postData.created_date}</h5>
                </div>
                <div className='blog-post-image-desktop'>
                    <img src={postData.image_url} alt=""/>
                </div>
                <div className='blog-post-info-mobile'>
                    <h5><Link to={`/category/${postData.category}`}>{displayCategory}</Link></h5>
                    <h5>{postData.created_date}</h5>
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.content }} className="post-data"/>
                <Modal
                    onRequestClose={() => send('cancel')}
                    isOpen={
                        current.name === 'confirming' ||
                        current.name === 'loading'
                    }
                    className='delete-modal'
                    overlayClassName='delete-modal-overlay'
                >
                    Are you sure you want to DELETE this post?!
                    <button className='delete-modal-cancel-button' onClick={() => send('cancel')}>
                    Cancel
                    </button>
                    <button className='delete-modal-confirm-button' onClick={() => send('confirm')}>
                    Yes, delete this TRASH!
                    </button>
                </Modal>
                </div>
        </div>
    ) : (
        <div className='administrators-only-section'>
            <h1>This page is for administrators only.</h1>
        </div>
    )
  )
}

export default AdminPost;