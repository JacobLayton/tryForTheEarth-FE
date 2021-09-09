import React from "react";
import ContactForm from "../components/ContactForm";
import '../styles/contact-page.css';


function Contact(props) {
  return (
    <div className="contact-section-mobile">
      <ContactForm />
    </div>
  );
}

export default Contact;