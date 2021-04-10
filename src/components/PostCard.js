import React from "react";
import '../styles/post-card.css';
import moment from 'moment';
import { Link } from "react-router-dom";

const PostCard = (props) => {
    const createdDate = moment(props.post.created_date).format('MMMM Do, YYYY');

    return (
    <div className='card-wrapper'>
        <Link to={`/blogpost/${props.post.id}`} key={props.post.id}>
            <img src={props.post.image_url} alt=""/>
        </Link>
        <div className='card-info'>
            <h5>{createdDate}</h5>
            <h5>{props.post.category}</h5>
            <h2>{props.post.title}</h2>
            <p>{props.post.blurb}</p>
        </div>
        <div className='card-line-break' />
    </div>
    );
};

export default PostCard;