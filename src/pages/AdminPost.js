import React, { useState, useEffect } from "react";
import { useHistory, Link } from 'react-router-dom';
import axios from "axios";
import '../styles/blog-post.css';
import { useAuth0 } from "@auth0/auth0-react";
import Modal from "react-modal";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { useMachine } from "react-robot";

async function doSomethingCustom(postId, history) {
    // pretend to delete something
    return new Promise((resolve) => {
      console.log('Beginning delete, postId: ', postId);
      axios.delete(`http://localhost:9001/posts/${postId}`)
      .then(res => {
          console.log('Delete complete: ', res);
          resolve();
          history.push('/admin');
      })
      .catch(err => {
          console.log('Error deleting: ', err);
      })
    //   setTimeout(() => {
    //     console.log('Done custom action');
    //     resolve();
    //   }, 1000);
    });
}

function AdminPost({ match }) {
    const { isAuthenticated, isLoading } = useAuth0();
    const {
        params: {id},
    } = match;
    let history = useHistory();
    // const [isLoading, setIsLoading] = useState(true);
    const [postData, setPostData] = useState([]);
    const [current, send] = useMachine(ConfirmationModal);

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
	  }, [id]);

      if (isLoading) {
        return <div> LOADING.... </div>;
      }

  return (
    isAuthenticated ? (
        <div className='blog-post-container'>
            <h1>Current state: {current.name}</h1>
            <Link to={`/editpost/${postData.id}`}>
                <button>Edit</button>
            </ Link>
            <button 
                onClick={() =>
                    send({
                      type: 'begin',
                      onCommit: (context, event) => doSomethingCustom(postData.id, history)
                    })
                  }
            >
                Delete
            </button>
            <h1>{postData.title}</h1>
            <h5>{postData.category}</h5>
            <h5>{postData.created_date}</h5>
            <img src={postData.image_url} alt=""/>
            <div dangerouslySetInnerHTML={{ __html: postData.content }} className="postData"/>
            <Modal
                onRequestClose={() => send('cancel')}
                isOpen={
                    current.name === 'confirming' ||
                    current.name === 'loading'
                }
            >
                Are you sure?!
                <button onClick={() => send('cancel')}>
                Cancel
                </button>
                <button onClick={() => send('confirm')}>
                Yes Definitely
                </button>
            </Modal>
        </div>
    ) : (
        <div>
            <h1>This page is for administrators only.</h1>
        </div>
    )
  )
}

export default AdminPost;