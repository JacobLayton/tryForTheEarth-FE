import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/scroll-up-arrow.css';
import * as Scroll from 'react-scroll';
const scroll = Scroll.animateScroll;


function ScrollUpArrow(props) {
    function handleClick() {
        scroll.scrollToTop();
    }
  return (
    <div className="scroll-arrow-container">
        <div className='arrow-and-text-container' onClick={handleClick}>
            <FontAwesomeIcon icon={['fas', 'angle-up']} size="3x" className="scroll-up-arrow" />
            <span className='scroll-up-text'>Back To Top</span>
        </div>
    </div>
  );
}

export default ScrollUpArrow;