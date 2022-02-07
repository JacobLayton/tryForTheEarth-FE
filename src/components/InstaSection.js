import React, { useState, useEffect } from "react";
import axios from "axios";
import InstaPost from "./InstaPost";

function InstaSection(props) {
    const [instaPosts, setInstaPosts] = useState([]);
    useEffect(() => {
        async function fetchInstaPosts() {
          try {
            axios.get(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,timestamp,caption,thumbnail_url,permalink&limit=${process.env.REACT_APP_INSTA_LIMIT}&access_token=${process.env.REACT_APP_INSTA_TOKEN}`)
            .then((res) => {
              setInstaPosts(res.data.data);
            })
          } catch (err) {
            console.log('ERROR: ', err);
          }
        }
        fetchInstaPosts();
      }, []);

  return (
    <div className='picture-section'>
        {
            instaPosts.length > 1 ?
                instaPosts.map((instaPost) => {
                    return <InstaPost key={instaPost.id} feed={instaPost} />
                })
            : <h1> Loading...</h1>
        }
    </div>
  );
}

export default InstaSection;