import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const HamburgerButton = () => {
    function handleClick(e) {
        console.log('Button Clicked!')
    }

  return (
    <div onClick={handleClick}>
      <FontAwesomeIcon icon={faBars} size="lg"/>
    </div>
  );
};

export default HamburgerButton;