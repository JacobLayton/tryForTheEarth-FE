import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard"

function Lifestyle(props) {
    const [posts, setPosts] = useState([]);

	useEffect(() => {
        let mounting = true;
		axios.get('http://localhost:9001/posts/category/lifestyle')
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
        <h1>Lifestyle</h1>
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

export default Lifestyle;