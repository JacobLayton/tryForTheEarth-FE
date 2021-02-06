import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  return (
    <div className='navbarContainer'>
        <FontAwesomeIcon icon={faBars} size="lg"/>
        <Link to="/">Home</Link>
    </div>
  );
};

export default Navbar;