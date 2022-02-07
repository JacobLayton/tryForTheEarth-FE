import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import '../styles/category-pages.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function ProductReviews(props) {
    gsap.registerPlugin(ScrollTrigger);
    const [posts, setPosts] = useState([]);

	useEffect(() => {
        let mounting = true;
		axios.get(`${process.env.REACT_APP_SERVER_URL}/posts/category/product_reviews`)
			.then(res =>  {
				console.log('API CALLED', res);
                if(mounting) {
                    setPosts(res.data);
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
  return (
    <div className='category-page'>
        <div className='category-header'>
            <h1 className='category-title'>Product Reviews</h1>
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

export default ProductReviews;