import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoutButton from '../components/Logout-Button';
import PostCard from "../components/PostCard";
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/home-page.css';


function Admin(props) {
  const { user, isAuthenticated, isLoading } = useAuth0();
  gsap.registerPlugin(ScrollTrigger);
  const ref = useRef(null);
  const [posts, setPosts] = useState([]);
  const location = useLocation();

    useEffect(() => {
      let mounting = true;
      axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`)
        .then(res =>  {
          const postsSortedByDate = res.data.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
          if(mounting) {
              setPosts(postsSortedByDate);
          }
        })
        .catch(err => {
          console.log('Error in get request', err);
        })
          return () => mounting = false;
      }, []);
      useEffect(() => {
        const cards = gsap.utils.toArray('.card-wrapper');
        cards.forEach(card => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 20
            },
            {
              opacity: 1,
              y: 0,
              scrollTrigger: {
                trigger: card,
                // markers: true,
                // once: true,
                // scrub: true,
              }
            }
          )
        })
      })

      if (isLoading) {
        return <div> LOADING.... </div>;
      }
  
  return (
    isAuthenticated ? (
      <div className='home-container'>
        <div className='home-container-mobile' ref={ref}>
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
      </div>
    ) :
    <div className='administrators-only-section'>
      <h1>This page is for administrators only.</h1>
    </div>
  );
};

export default Admin;