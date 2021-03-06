import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const HamburgerButton = (props) => {
    function handleClick(e) {
        console.log('Button Clicked!');
        props.handleClick();
    }

  return (
    <div onClick={handleClick}>
      <FontAwesomeIcon icon={faBars} size="lg"/>
    </div>
  );
};

export default HamburgerButton;