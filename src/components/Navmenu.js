import React from "react";
import { useHistory, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import '../styles/nav-menu.css';
import * as Scroll from 'react-scroll';
const scroller = Scroll.scroller;

const NavMenu = (props) => {
    const history = useHistory();
    function handleAboutClick() {
        if (history.location.pathname !== "/") {
            setTimeout(function() {
                scroller.scrollTo('about-container-id', {
                duration: 1500,
                delay: 100,
                smooth: true
            })
            }, 200);
        } else {
            scroller.scrollTo('about-container-id', {
                duration: 1500,
                delay: 100,
                smooth: true
            })
        }
    }


    return (
    <div onMouseUp={props.handleMouseUp} className={`navmenuContainer ${props.displayMenu ? 'showing' : 'hiding'}`}>
        <FontAwesomeIcon icon={faTimesCircle} size="lg" className='closeButton'/>
        <div className='page-links'>
            <Link to="/category/product_reviews">Product Reviews</Link>
            <Link to="/category/for_the_home">For The Home</Link>
            <Link to="/category/lifestyle">Lifestyle</Link>
            <Link to="/" onClick={handleAboutClick}>About</Link>
            <Link to="/contact">Contact</Link>
        </div>
    </div>
    );
};

export default NavMenu;