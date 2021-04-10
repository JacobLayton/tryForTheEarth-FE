import React, { useState, useEffect } from "react";
import '../styles/home-page.css';
import { Link } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard";
import TFTEselfie from '../img/TFTEselfie.jpeg';
import Earth from '../img/earf.png';

function Home(props) {
  const [posts, setPosts] = useState([]);

	useEffect(() => {
        let mounting = true;
		axios.get('http://localhost:9001/posts')
			.then(res =>  {
        const postsSortedByDate = res.data.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
        const postsMostRecentThree = postsSortedByDate.slice(0, 3);
          if(mounting) {
              setPosts(postsMostRecentThree);
          }
			})
			.catch(err => {
				console.log('Error in get request', err);
			})
        return () => mounting = false;
	  }, []);
    console.log('POSTS: ', posts);

  return (
    <div className='home-container'>
      <div className='intro-container' id='animate-area'>
        <div className='intro-paragraph'>
          <p>Let me introduce you to the face behind Try for the Earth: I’m Taylin. My intention is to encourage others to live more sustainably, for the earth! Here you’ll see my latest thoughts and tips on how to do so. I thoroughly enjoy learning and trying new things. I’m looking forward to sharing the knowledge as it comes and I’m guessing since you’re here you want to learn too! Let’s do this. </p>
        </div>
      </div>
      <div className='recent-posts'>
        <h1>- Recent Posts -</h1>
        <div className='line-break' />
      </div>
      <div className='home-cards'>
        {posts.map(post => {
              return ( 
                  // <Link to={`/blogpost/${post.id}`} key={post.id}>
                      <PostCard post={post} key={post.id}/>
                  // </Link>
              )
          })}
      </div>
    </div>
    );
}

export default Home;