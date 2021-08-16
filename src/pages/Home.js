import React, { useState, useEffect } from "react";
import '../styles/home-page.css';
import { Link } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard";
import TFTEselfie from '../img/TFTEselfie.jpeg';

function Home(props) {
  const [posts, setPosts] = useState([]);
  let maxNumberOfPostsToDisplay = posts.length;
  if (posts.length % 3) {
    maxNumberOfPostsToDisplay = posts.length - (posts.length % 3);
  }
  let [numberOfPosts, setNumberOfPosts] = useState(6);
  let displayPosts = posts.slice(0, numberOfPosts);


	useEffect(() => {
        let mounting = true;
		axios.get('http://localhost:9001/posts')
			.then(res =>  {
        const postsSortedByDate = res.data.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
        const postsMostRecentNine = postsSortedByDate.slice(0, 12);
          if(mounting) {
              setPosts(postsSortedByDate);
          }
			})
			.catch(err => {
				console.log('Error in get request', err);
			})
        return () => mounting = false;
	  }, []);
  
  function handleDisplayMorePosts(e) {
    e.preventDefault();
    // if (numberOfPosts < 12) {
      setNumberOfPosts(numberOfPosts += 3);
    // }
  }

  return (
    <div className='home-container'>
      <div className='home-container-mobile'>
        <div className='intro-container'>
          <div className='intro-paragraph'>
            <p>Let me introduce you to the face behind Try for the Earth: I’m Taylin. My intention is to encourage others to live more sustainably, for the earth! Here you’ll see my latest thoughts and tips on how to do so. I thoroughly enjoy learning and trying new things. I’m looking forward to sharing the knowledge as it comes and I’m guessing since you’re here you want to learn too! Let’s do this. </p>
          </div>
        </div>
        <div className='recent-posts'>
          <h1>Recent Posts</h1>
          <div className='line-break' />
        </div>
        <div className='home-cards'>
          {displayPosts.map(post => {
                return ( 
                    // <Link to={`/blogpost/${post.id}`} key={post.id}>
                        <PostCard post={post} key={post.id}/>
                    // </Link>
                )
            })}
        </div>
        <div className='display-more-posts'>
          {numberOfPosts < maxNumberOfPostsToDisplay ?
          <span onClick={handleDisplayMorePosts}>▼ SHOW MORE POSTS ▼</span> :
          null
          }
        </div>
        <div className='about-container' name='about-container-id'>
            <h1>About the Author</h1>
            <img src={TFTEselfie} alt='Picture of the author' />
            <p>Let me introduce you to the face behind Try for the Earth: I’m Taylin. My intention is to encourage others to live more sustainably, for the earth! Here you’ll see my latest thoughts and tips on how to do so. I thoroughly enjoy learning and trying new things. I’m looking forward to sharing the knowledge as it comes and I’m guessing since you’re here you want to learn too! Let’s do this. </p>
            <div className='line-break' />
        </div>
        <div className='insta-section'>
          <div className='about-container-desktop'>
            <h1>About the Author</h1>
              <img src={TFTEselfie} alt='Picture of the author' />
              <p>Let me introduce you to the face behind Try for the Earth: I’m Taylin. My intention is to encourage others to live more sustainably, for the earth! Here you’ll see my latest thoughts and tips on how to do so. I thoroughly enjoy learning and trying new things. I’m looking forward to sharing the knowledge as it comes and I’m guessing since you’re here you want to learn too! Let’s do this. </p>
          </div>
          <div className='insta-content'>
            <h1>Check out my Instagram</h1>
            <div className='picture-section'>
              <div className='picture-row'>
                <div className='box'/>
                <div className='box'/>
                <div className='box'/>
                <div className='box'/>
                <div className='box'/>
                <div className='box'/>
                <div className='box'/>
                <div className='box'/>
              </div>
          </div>
          </div>
        </div>
      </div>
      {/* <div className='home-container-desktop'>
        <div className='left-panel'>

        <div className='recent-posts'>
            <h1>Recent Posts</h1>
            <div className='line-break' />
          </div>
          <div className='home-cards'>
            {displayPosts.map(post => {
                  return ( 
                      // <Link to={`/blogpost/${post.id}`} key={post.id}>
                          <PostCard post={post} key={post.id}/>
                      // </Link>
                  )
              })}
          </div>
          <div className='display-more-posts'>
            {numberOfPosts < 9 ?
            <span onClick={handleDisplayMorePosts}>▼ SHOW MORE POSTS ▼</span> :
            null
            }
          </div>
        </div>
        <div className='right-panel'>
        <div className='intro-container'>
            <div className='intro-paragraph'>
              <p>Let me introduce you to the face behind Try for the Earth: I’m Taylin. My intention is to encourage others to live more sustainably, for the earth! Here you’ll see my latest thoughts and tips on how to do so. I thoroughly enjoy learning and trying new things. I’m looking forward to sharing the knowledge as it comes and I’m guessing since you’re here you want to learn too! Let’s do this. </p>
            </div>
          </div>
          <div className='about-container' name='about-container-id'>
              <h1>About the Author</h1>
              <img src={TFTEselfie} alt='Picture of the author' />
              <p>Let me introduce you to the face behind Try for the Earth: I’m Taylin. My intention is to encourage others to live more sustainably, for the earth! Here you’ll see my latest thoughts and tips on how to do so. I thoroughly enjoy learning and trying new things. I’m looking forward to sharing the knowledge as it comes and I’m guessing since you’re here you want to learn too! Let’s do this. </p>
              <div className='line-break' />
          </div>
        </div>
      </div> */}
    </div>
    );
}

export default Home;