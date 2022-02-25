import React, { useState, useEffect, useRef } from "react";
import '../styles/home-page.css';
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAuth0 } from "@auth0/auth0-react";
// import TFTEselfie from '../img/TFTEselfie.jpeg';
import TFTEselfie1 from '../img/about_me_1.jpg';
// import TFTEselfie2 from '../img/about_me_2.jpg';
import PostCard from "../components/PostCard";
import InstaSection from "../components/InstaSection";
import ContactForm from "../components/ContactForm.js";
import AdminInfo from "../components/AdminInfo";

function Home(props) {
  const { isAuthenticated } = useAuth0();
  gsap.registerPlugin(ScrollTrigger);
  const ref = useRef(null);
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
        // const postsMostRecentNine = postsSortedByDate.slice(0, 12);
          if(mounting) {
              setPosts(postsSortedByDate);
              handleScrollPosition();
          }
			})
			.catch(err => {
				console.log('Error in get request', err);
			})
        return () => mounting = false;
	  }, []);
  
  useEffect(() => {
    if (numberOfPosts === 6) {
      ScrollTrigger.refresh();
      const cards = gsap.utils.toArray('.card-wrapper');
      cards.forEach(card => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 40
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
    } else {
      ScrollTrigger.refresh();
      const cards = gsap.utils.toArray('.card-wrapper');
      cards.forEach(card => {
        gsap.fromTo(
          card,
          {
            opacity: 1,
            y: 0
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
          y: 40
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
        y: 40
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
        y: 40
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
        y: 40
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

  function handleScrollPosition() {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      sessionStorage.removeItem("scrollPosition");
    }
  }
  
  function handleDisplayMorePosts(e) {
    e.preventDefault();
    // if (numberOfPosts < 12) {
      setNumberOfPosts(numberOfPosts += 3);
    // }
  }

  return (
    <div className='home-container'>
      <div className='home-container-mobile' ref={ref}>
      {isAuthenticated ?
            <AdminInfo postId={null} postTitle={null}/> : null}
        <div className='intro-container'>
          <div className='intro-paragraph'>
            <p className='mission-statement'>A realistic curation of a more sustainable life through habits, products, and choices.</p>
            <p className='short-intro'>My intention is to encourage others to live more sustainably, for the earth! Here you’ll see my latest thoughts and tips on how to do so. I thoroughly enjoy learning and trying new things, and I’m guessing since you’re here you want to learn too! Let’s do this.</p>
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
                        <PostCard post={post} key={post.id} />
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
            <img src={TFTEselfie1} alt='Selfie of the author' className='selfie-mobile'/>
              <p>Hi! My name is Taylin. I’m a twenty-something who has slowly become more aware of the effect my individual choices have on the environment around me. I believe in climate change, and I believe that we still have time to correct the course. I am publicly curating a more sustainable personal life, in hopes that I will encourage and influence others to try as well. It doesn’t hurt to try!</p>
              <p>By inspiring people to be more eco-conscious in their personal lives, there is a greater chance that people will start to put pressure on legislation and big corporations (aka the big drivers of the climate crisis) to change!</p>
              <p>My background is in Animal Science and Fisheries and Wildlife Science. So you might say I’m an animal lover. I love reading, cooking, music, and outdoor leisure activities. I work full time in Veterinary Research and am taking on Try for the Earth as a side project. I can’t wait to connect with people who share the same passions as me. Let’s connect!</p>
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
            <div className='about-desktop-content'>
              <div className='about-desktop-image'>
                <img src={TFTEselfie1} alt='Selfie of the author' className='selfie-desktop'/>
              </div>
              <div className='about-desktop-paragraphs'>
                <p>"Hi! My name is Taylin. I’m a twenty-something who has slowly become more aware of the affects my individual choices have on the environment around me. I believe in climate change, and I believe that we still have time to correct the course. I am publicly curating a more sustainable personal life, in hopes that I will encourage and influence others to try as well. It doesn’t hurt to try!</p>
                <p>By inspiring people to be more eco-conscious in their personal lives, there is a greater chance that people will start to put pressure on legislation and big corporations (aka the big drivers of the climate crisis) to change!</p>
                <p>My background is in Animal Science and Fisheries and Wildlife Science. So you might say I’m an animal lover. I love reading, cooking, music, and outdoor leisure activities. I work full time in Veterinary Research and am taking on Try for the Earth as a side project. I can’t wait to connect with people who share the same passions as me. Let’s connect!"</p>
              </div>
            </div>
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