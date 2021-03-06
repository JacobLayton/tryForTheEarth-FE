import React from "react";
import '../styles/post-card.css'

const PostCard = (props) => {

    return (
    <div className='card-wrapper'>
        <h2>{props.post.title}</h2>
        <h5>{props.post.created_date}</h5>
        <h5>{props.post.category}</h5>
        <img src={props.post.image_url} alt=""/>
        <p>{props.post.blurb}</p>
    </div>
    );
};

export default PostCard;