import React from "react";
import '../styles/post-card.css';
import moment from 'moment';
import { Link } from "react-router-dom";
import { titleToUrlHelper } from '../helpers/helperFunctions.js';

const PostCard = (props) => {
    const createdDate = moment(props.post.created_date).format('MMMM Do, YYYY');
    let urlStringLiteral;
    if(props.pathname === '/admin') {
        urlStringLiteral = 'adminpost';
    } else {
        urlStringLiteral = 'blogpost';
    }
    let displayCategory;
    if (props.post.category === 'product_reviews') {
        displayCategory = 'Product Review';
    } else if (props.post.category === 'lifestyle') {
        displayCategory = 'Lifestyle';
    } else if (props.post.category === 'for_the_home') {
        displayCategory = 'For The Home';
    } else {
        displayCategory = 'General';
    }
    const urlFriendlyTitle = titleToUrlHelper(props.post.title);

    return (
    <div className='card-wrapper'>
        <div className='card-wrapper-sans-linebreak'>
            <Link to={`/${urlStringLiteral}/${props.post.id}/${urlFriendlyTitle}`} key={props.post.id} className='post-card-image-link'>
                <img src={props.post.image_url} alt=""/>
                <p className='hover-blurb'>{props.post.blurb}</p>
            </Link>
            <div className='card-info'>

                    <h2 className='card-title'>
                    <Link to={`/${urlStringLiteral}/${props.post.id}/${urlFriendlyTitle}`} key={props.post.id}>{props.post.title}</Link>
                    </h2>

                <h5>{createdDate}</h5>
                <h5 className='card-category'>
                    <Link to={`/category/${props.post.category}`}>{displayCategory}</Link>
                </h5>
                <p>{props.post.blurb}</p>
                <Link to={`/${urlStringLiteral}/${props.post.id}/${urlFriendlyTitle}`} key={props.post.id}>
                    <div className='read-more'>
                        <span>READ MORE</span>
                        <span id='read-more-arrow'> »</span>
                    </div>
                </Link>
            </div>
        </div>
        <div className='card-line-break' />
    </div>
    );
};

export default PostCard;