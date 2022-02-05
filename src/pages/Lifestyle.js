import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import '../styles/category-pages.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Lifestyle(props) {
    gsap.registerPlugin(ScrollTrigger);
    const [posts, setPosts] = useState([]);

	useEffect(() => {
        let mounting = true;
		axios.get(`${process.env.REACT_APP_SERVER_URL}/posts/category/lifestyle`)
			.then(res =>  {
                if(mounting) {
                    setPosts(res.data);
                    handleScrollPosition();
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
                // markers: true
                }
            }
            )
        })
    })
    function handleScrollPosition() {
        const scrollPosition = sessionStorage.getItem('scrollPosition');
        if (scrollPosition) {
          window.scrollTo(0, parseInt(scrollPosition));
          sessionStorage.removeItem("scrollPosition");
        }
    }
  return (
    <div className='category-page'>
        <div className='category-header'>
            <h1 className='category-title'>Lifestyle</h1>
            <div className='category-line-break' />
        </div>
        <div className='category-cards'>
            {posts.map(post => {
                return ( 
                    // <Link to={`/blogpost/${post.id}`} key={post.id}>
                    //     <PostCard post={post} key={post.id}/>
                    // </Link>
                    <PostCard post={post} key={post.id}/>
                )
            })}
        </div>
    </div>
    );
}

export default Lifestyle;