import { React, useState, useEffect } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import '../styles/nav-menu.css';
import * as Scroll from 'react-scroll';
const scroller = Scroll.scroller;

function NavMenu(props) {
    const history = useHistory();
    const [lifestyleIndicator, setLifestyleIndicator] = useState('hidden');
    const [productMentionsIndicator, setProductMentionsIndicator] = useState('active');
    const [homemadeIndicator, setHomemadeIndicator] = useState('hidden');
    const [contactIndicator, setContactIndicator] = useState('hidden');
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('lifestyle')) {
            setLifestyleIndicator('active');
            setProductMentionsIndicator('hidden');
            setHomemadeIndicator('hidden');
            setContactIndicator('hidden');
        } else if (location.pathname.includes('product_mentions')) {
            setLifestyleIndicator('hidden');
            setProductMentionsIndicator('active');
            setHomemadeIndicator('hidden');
            setContactIndicator('hidden');
        } else if (location.pathname.includes('homemade')) {
            setLifestyleIndicator('hidden');
            setProductMentionsIndicator('hidden');
            setHomemadeIndicator('active');
            setContactIndicator('hidden');
        } else if (location.pathname.includes('contact')) {
            setLifestyleIndicator('hidden');
            setProductMentionsIndicator('hidden');
            setHomemadeIndicator('hidden');
            setContactIndicator('active');
        } else {
            setLifestyleIndicator('hidden');
            setProductMentionsIndicator('hidden');
            setHomemadeIndicator('hidden');
            setContactIndicator('hidden');
        }
	}, [location.pathname]);
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
    function resetScrollPosition() {
        sessionStorage.removeItem("scrollPosition");
    }


    return (
    <div onMouseUp={props.handleMouseUp} className={`navmenuContainer ${props.displayMenu ? 'showing' : 'hiding'}`}>
        <FontAwesomeIcon icon={faTimesCircle} size="lg" className='closeButton'/>
        <div className='page-links'>
            <Link to="/lifestyle" onClick={resetScrollPosition}><span className={`${lifestyleIndicator}`}>| </span><span className='nav-menu-item'>Lifestyle</span></Link>
            <Link to="/product_mentions" onClick={resetScrollPosition}><span className={`${productMentionsIndicator}`}>| </span><span className='nav-menu-item'>Product Mentions</span></Link>
            <Link to="/homemade" onClick={resetScrollPosition}><span className={`${homemadeIndicator}`}>| </span><span className='nav-menu-item'>Homemade</span></Link>
            <Link to="/" onClick={handleAboutClick}><span className='nav-menu-item'>About</span></Link>
            <Link to="/contact" onClick={resetScrollPosition}><span className={`${contactIndicator}`}>| </span><span className='nav-menu-item'>Contact</span></Link>
        </div>
    </div>
    );
};

export default NavMenu;
