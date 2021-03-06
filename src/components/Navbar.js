import React from "react";
import { Link } from "react-router-dom";
import HamburgerButton from './HamburgerButton';


const Navbar = (props) => {

  return (
    <div className='navbarContainer'>
        <HamburgerButton handleClick={props.toggleMenu}/>
        <Link to="/">Home</Link>
    </div>
  );
};

export default Navbar;