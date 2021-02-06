import React from "react";
import { Link } from "react-router-dom";
import HamburgerButton from './HamburgerButton';


const Navbar = () => {
  return (
    <div className='navbarContainer'>
        <HamburgerButton />
        <Link to="/">Home</Link>
    </div>
  );
};

export default Navbar;