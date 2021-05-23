import React from "react";
import { Link } from "react-router-dom";
import HamburgerButton from './HamburgerButton';
import TFTELogo from '../img/TFTElogo.png';
import tfteLogo from '../img/tfte-logo-sm-trimmy.png';
import '../styles/nav-bar.css';


const Navbar = (props) => {

  return (
    <div className='navbarContainer'>
        <HamburgerButton handleClick={props.toggleMenu}/>
        <div className='navbar-logo'>
          <Link to='/'>
            <img src={tfteLogo} alt='Try for the earth logo' className='tfte-logo'/>
          </Link>
        </div>
    </div>
  );
};

export default Navbar;