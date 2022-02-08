import React from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/footer.css';


const Footer = (props) => {

  return (
    <div className='footer-container'>
        <div className='footer-content'>
            {/* <h1 className='footer-text'>Join The Community</h1>
            <h4 className='footer-text'>Subscribe for my sustainability newsletter</h4> */}
            <div className='footer-interactive'>
                {/* <div className='footer-form'>
                    <input type='email' placeholder='EMAIL ADDRESS'/>
                    <button>Join!</button>
                </div> */}
                {/* <div className='footer-social-icons'>
                    <FontAwesomeIcon icon={['fab', 'facebook-f']} size="lg" className='social-icon'/>
                    <FontAwesomeIcon icon={['fab', 'instagram']} size="lg" className='social-icon'/>
                    <FontAwesomeIcon icon={['fab', 'pinterest-p']} size="lg" className='social-icon'/>
                    <FontAwesomeIcon icon={['fab', 'twitter']} size="lg" className='social-icon'/>
                    <FontAwesomeIcon icon={['fab', 'youtube']} size="lg" className='social-icon'/>
                </div> */}
                <div className='footer-copyright'>
                    <span className='footer-text'>© 2021 TRYFORTHEEARTH</span>
                    <span className='footer-text'>ALL RIGHTS RESERVED</span>
                    <span className='footer-text'>DESIGN AND DEVELOPMENT BY <a className='footer-text footer-link' href="http://www.jacoblayton.dev" target="_blank" rel="noreferrer">JACOB LAYTON</a></span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Footer;