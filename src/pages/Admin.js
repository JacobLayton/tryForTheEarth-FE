import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LogoutButton from '../components/Logout-Button';
import PostCard from "../components/PostCard";
import { useAuth0 } from "@auth0/auth0-react";


function Admin(props) {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [posts, setPosts] = useState([]);

  // if (isLoading) {
  //   return <div> LOADING.... </div>;
  // }

  useEffect(() => {
    let mounting = true;
    axios.get('http://localhost:9001/posts')
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

    if (isLoading) {
      return <div> LOADING.... </div>;
    }

  return (
    isAuthenticated ? (
      <div>
        <h1>Admin Page</h1>
        <img src={user.picture} alt={user.name} />
        <h2>Hello {user.name}</h2>
        <p>{user.email}</p>
        <LogoutButton />
        <h1>Posts Below</h1>
        {posts.map(post => {
            return ( 
                <Link to={`/blogpost/${post.id}`} key={post.id}>
                    <PostCard post={post} key={post.id}/>
                </Link>
            )
        })}
      </div>
    ) :
    <div>
      <h1>This page is for administrators only.</h1>
    </div>
  );
};

export default Admin;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import PostCard from "../components/PostCard";

// function Minimalism(props) {
//     const [posts, setPosts] = useState([]);

// 	useEffect(() => {
//         let mounting = true;
// 		axios.get('http://localhost:9001/posts/category/minimalism')
// 			.then(res =>  {
// 				console.log('API CALLED', res);
//                 if(mounting) {
//                     setPosts(res.data);
//                 }
// 			})
// 			.catch(err => {
// 				console.log('Error in get request', err);
// 			})
//         return () => mounting = false;
// 	  }, []);
//     console.log('POSTS: ', posts);
//   return (
//     <div>
//         <h1>Minimalism</h1>
//         {posts.map(post => {
//             return ( 
//                 <Link to={`/blogpost/${post.id}`} key={post.id}>
//                     <PostCard post={post} key={post.id}/>
//                 </Link>
//             )
//         })}
//     </div>
//     );
// }

// export default Minimalism;