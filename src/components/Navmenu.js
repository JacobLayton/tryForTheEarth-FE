import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Navmenu = () => {
  return (
    <div className='navmenuContainer'>
        <div className='hamburger'>
            <FontAwesomeIcon icon={faBars} size="lg"/>
        </div>
        <ul>
            <Link to="/minimalism">Minimalism</Link>
            <Link to="/forthehome">For The Home</Link>
            <Link to="/lifestyle">Lifestyle</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
        </ul>
    </div>
  );
};

export default Navmenu;