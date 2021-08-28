import React from "react";
import { useHistory, Link } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../styles/nav-buttons-desktop.css';

const NavButtonsDesktop = (props) => {
    // function handleClick(e) {
    //     console.log('Button Clicked!');
    //     props.handleClick();
    // }

  return (
    <div className='nav-buttons-desktop'>
      <div className='desktop-home-button'>
          <Link to='/'>Home</Link>
      </div>
      <div className='desktop-category-buttons'>
        <Link to='/category/product_reviews'>Product Reviews</Link>
        <Link to='/category/for_the_home'>For The Home</Link>
        <Link to='/category/lifestyle'>Lifestyle</Link>
      </div>
    </div>
  );
};

export default NavButtonsDesktop;