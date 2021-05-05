import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faInstagram } from '@fortawesome/free-solid-svg-icons';
import '../styles/footer.css';


const Footer = (props) => {

  return (
    <div className='footer-container'>
        <div className='footer-content'>
            <h1 className='footer-text'>Join The Community</h1>
            <h4 className='footer-text'>Subscribe for my sustainability newsletter</h4>
            <div className='footer-interactive'>
                <div className='footer-form'>
                    <input type='email' placeholder='EMAIL ADDRESS'/>
                    <button>Join!</button>
                </div>
                <div className='footer-social-icons'>
                    <FontAwesomeIcon icon={['fab', 'facebook-f']} size="lg" className='social-icon'/>
                    <FontAwesomeIcon icon={['fab', 'instagram']} size="lg" className='social-icon'/>
                    <FontAwesomeIcon icon={['fab', 'pinterest-p']} size="lg" className='social-icon'/>
                    <FontAwesomeIcon icon={['fab', 'twitter']} size="lg" className='social-icon'/>
                    <FontAwesomeIcon icon={['fab', 'youtube']} size="lg" className='social-icon'/>
                </div>
                <div className='footer-copyright'>
                    <span className='footer-text'>© 2021 TRY FOR THE EARTH</span>
                    <span className='footer-text'>ALL RIGHTS RESERVED</span>
                    <span className='footer-text'>DESIGN AND DEVELOPMENT BY JACOB LAYTON</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Footer;