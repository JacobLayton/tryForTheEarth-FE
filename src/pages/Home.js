import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import '../styles/home-page.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TFTEselfie from '../img/TFTEselfie.jpeg';
import PostCard from "../components/PostCard";
import InstaSection from "../components/InstaSection";
import ContactForm from "../components/ContactForm.js";

function Home(props) {
  gsap.registerPlugin(ScrollTrigger);
  const ref = useRef(null);
  // const selfieRef = useRef();
  // const q = gsap.utils.selector(selfieRef);
  const [posts, setPosts] = useState([]);
  let maxNumberOfPostsToDisplay = posts.length;
  if (posts.length % 3) {
    maxNumberOfPostsToDisplay = posts.length - (posts.length % 3);
  }
  let [numberOfPosts, setNumberOfPosts] = useState(6);
  let displayPosts = posts.slice(0, numberOfPosts);


	useEffect(() => {
        let mounting = true;
		axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`)
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
  useEffect(() => {
    if (numberOfPosts === 6) {
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
    }
  })
  useEffect(() => {
    ScrollTrigger.refresh();
    const photos = gsap.utils.toArray('.insta-photo');
    photos.forEach(photo => {
      gsap.fromTo(
        photo,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: photo
          }
        }
      )
    })
  })
  useEffect(() => {
    ScrollTrigger.refresh();
    const element = ref.current;
    gsap.fromTo(
      element.querySelector('.selfie-mobile'),
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: element.querySelector(".about-container"),
          start: "top 75%",
          end: "bottom bottom",
          // once: true,
        },
      }
    )
  })
  useEffect(() => {
    ScrollTrigger.refresh();
    const element = ref.current;
    gsap.fromTo(
      element.querySelector('.selfie-desktop'),
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: element.querySelector(".about-container-desktop"),
          start: "top 75%",
          end: "bottom bottom",
        },
      }
    )
    gsap.fromTo(
      element.querySelector('.contact-form'),
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: element.querySelector(".about-container-desktop"),
          start: "top 75%",
          end: "bottom bottom",
        },
      }
    )
  })
  
  function handleDisplayMorePosts(e) {
    e.preventDefault();
    // if (numberOfPosts < 12) {
      setNumberOfPosts(numberOfPosts += 3);
    // }
  }

  return (
    <div className='home-container'>
      <div className='home-container-mobile' ref={ref}>
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
            <img src={TFTEselfie} alt='Selfie of the author' className='selfie-mobile'/>
            <p>Let me introduce you to the face behind Try for the Earth: I’m Taylin. My intention is to encourage others to live more sustainably, for the earth! Here you’ll see my latest thoughts and tips on how to do so. I thoroughly enjoy learning and trying new things. I’m looking forward to sharing the knowledge as it comes and I’m guessing since you’re here you want to learn too! Let’s do this. </p>
            <div className='line-break' />
        </div>
        <div className='insta-section'>
          {/* <div className='about-container-desktop'>
            <h1>About the Author</h1>
              <img src={TFTEselfie} alt='Picture of the author' className='selfie-desktop'/>
              <p>Let me introduce you to the face behind Try for the Earth: I’m Taylin. My intention is to encourage others to live more sustainably, for the earth! Here you’ll see my latest thoughts and tips on how to do so. I thoroughly enjoy learning and trying new things. I’m looking forward to sharing the knowledge as it comes and I’m guessing since you’re here you want to learn too! Let’s do this. </p>
          </div> */}
          <div className='insta-content'>
            <div className='insta-title-container'>
              <h1>Check out my Instagram</h1>
              <div className='line-break' />
            </div>
            <InstaSection />
          </div>
        </div>
        <div className='about-contact-desktop'>
          <div className='about-container-desktop'>
            <div className='about-author-container'>
              <h1>About the Author</h1>
              <div className='line-break' />
            </div>
              <img src={TFTEselfie} alt='Picture of the author' className='selfie-desktop'/>
              <p>Let me introduce you to the face behind Try for the Earth: I’m Taylin. My intention is to encourage others to live more sustainably, for the earth! Here you’ll see my latest thoughts and tips on how to do so. I thoroughly enjoy learning and trying new things. I’m looking forward to sharing the knowledge as it comes and I’m guessing since you’re here you want to learn too! Let’s do this. </p>
          </div>
          <div className='contact-section'>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
    );
}

export default Home;