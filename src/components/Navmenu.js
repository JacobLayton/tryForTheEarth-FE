import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import '../styles/nav-menu.css';

const NavMenu = (props) => {
    console.log(props.displayMenu);

    return (
    <div onMouseUp={props.handleMouseUp} className={`navmenuContainer ${props.displayMenu ? 'showing' : 'hiding'}`}>
        <FontAwesomeIcon icon={faTimesCircle} size="lg" className='closeButton'/>
        <div className='page-links'>
            <Link to="/minimalism">Minimalism</Link>
            <Link to="/forthehome">For The Home</Link>
            <Link to="/lifestyle">Lifestyle</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
        </div>
    </div>
    );
};

export default NavMenu;