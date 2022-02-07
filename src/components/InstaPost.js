import React from 'react';
import { Link } from "react-router-dom";

const InstaPost = (props) => {
    const { id, caption, media_type, media_url, permalink} = props.feed
    let post;

    switch (media_type) {
        case "VIDEO":
            post = (
                <video
                    src={media_url} 
                    type="video/mp4" 
                    controls playsinline>
                </video>
            )
            break;
        case "CAROUSEL_ALBUM":
            post = (
                <img 
                    id={id} 
                    src={media_url} 
                    alt={caption}
                    className='insta-photo'
                />
            );
            break;
        default:
            post = (
                <img 
                    id={id} 
                    src={media_url} 
                    alt={caption}
                    className='insta-photo'
                />
            );
    }       

    return (
        <React.Fragment>
            <Link to={{ pathname: permalink }} target="_blank">
                {post}
            </Link>
        </React.Fragment>
    );
}

export default InstaPost;