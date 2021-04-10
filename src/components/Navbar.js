import React from "react";
import { Link } from "react-router-dom";
import HamburgerButton from './HamburgerButton';
import TFTELogo from '../img/TFTElogo.png';
import '../styles/nav-bar.css';


const Navbar = (props) => {

  return (
    <div className='navbarContainer'>
        <HamburgerButton handleClick={props.toggleMenu}/>
        <Link to='/'>
          <img src={TFTELogo} alt='Try for the earth logo' />
        </Link>
    </div>
  );
};

export default Navbar;