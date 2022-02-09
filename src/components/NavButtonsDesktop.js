import React from "react";
import { Link } from "react-router-dom";
import '../styles/nav-buttons-desktop.css';

const NavButtonsDesktop = (props) => {
  function resetScrollPosition() {
    sessionStorage.removeItem("scrollPosition");
  }

  return (
    <div className='nav-buttons-desktop'>
      <div className='desktop-home-button'>
          <Link to='/' onClick={resetScrollPosition}>Home</Link>
      </div>
      <div className='desktop-category-buttons'>
        <Link to='/lifestyle' onClick={resetScrollPosition}>Lifestyle</Link>
        <Link to='/product_mentions' onClick={resetScrollPosition}>Product Mentions</Link>
        <Link to='/homemade' onClick={resetScrollPosition}>Homemade</Link>
      </div>
    </div>
  );
};

export default NavButtonsDesktop;