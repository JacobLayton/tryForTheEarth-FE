import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import LogoutButton from '../components/Logout-Button';
import PostCard from "../components/PostCard";
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/home-page.css';


function Admin(props) {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [posts, setPosts] = useState([]);
  const location = useLocation();

    useEffect(() => {
      let mounting = true;
      axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`)
        .then(res =>  {
                  if(mounting) {
                      setPosts(res.data);
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
      <div className='home-container'>
        <div className='admin-buttons'>
          <h1 className='admin-title'>Admin Page</h1>
          <h2>Hello {user.name}</h2>
          <LogoutButton />
          <Link to='/createpost'>
            <button className='admin-button'>Create New Post</button>
          </Link>
          <div className='line-break' />
        </div>
        <div className='home-cards'>
          {posts.map(post => {
              return ( 
                      <PostCard post={post} key={post.id} pathname={location.pathname}/>
              )
          })}
        </div>
      </div>
    ) :
    <div className='administrators-only-section'>
      <h1>This page is for administrators only.</h1>
    </div>
  );
};

export default Admin;