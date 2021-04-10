import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard";

function Minimalism(props) {
    const [posts, setPosts] = useState([]);

	useEffect(() => {
        let mounting = true;
		axios.get('http://localhost:9001/posts/category/minimalism')
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
    console.log('POSTS: ', posts);
  return (
    <div>
        <h1>Minimalism</h1>
        <div className='line-break' />
        {posts.map(post => {
            return ( 
                <Link to={`/blogpost/${post.id}`} key={post.id}>
                    <PostCard post={post} key={post.id}/>
                </Link>
            )
        })}
    </div>
    );
}

export default Minimalism;