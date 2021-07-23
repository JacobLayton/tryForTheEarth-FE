import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../styles/nav-bar.css';

const HamburgerButton = (props) => {
    function handleClick(e) {
        props.handleClick();
    }

  return (
    <div className='hamburger-button' onClick={handleClick}>
      <FontAwesomeIcon icon={faBars} size="lg"/>
    </div>
  );
};

export default HamburgerButton;