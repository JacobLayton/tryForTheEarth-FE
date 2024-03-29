import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import '../styles/category-pages.css';

function Minimalism(props) {
    const [posts, setPosts] = useState([]);

	useEffect(() => {
        let mounting = true;
		axios.get(`${process.env.REACT_APP_SERVER_URL}/posts/category/minimalism`)
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
  return (
    <div className='category-page'>
        <div className='category-header'>
            <h1 className='category-title'>Minimalism</h1>
            <div className='category-line-break' />
        </div>
        {posts.map(post => {
            return ( 
                // <Link to={`/blogpost/${post.id}`} key={post.id}>
                //     <PostCard post={post} key={post.id}/>
                // </Link>
                <PostCard post={post} key={post.id}/>
            )
        })}
    </div>
    );
}

export default Minimalism;