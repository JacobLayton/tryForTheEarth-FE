import React, { useState, useEffect, useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { gsap } from "gsap";
import axios from "axios";

function ContactForm() {
  const ref = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  useEffect(() => {
    if (submitted) {
      const element = ref.current;
      gsap.fromTo(
        element.querySelector('.contact-form-thank'),
        {
          opacity: 0,
          y: 200
        },
        {
          opacity: 1,
          y: 0,
        }
      )
      gsap.fromTo(
        element.querySelector('.contact-form-thank-message'),
        {
          opacity: 0,
          y: 200
        },
        {
          opacity: 1,
          y: 0,
        }
      )
    } else {
      return null;
    }
  })

  return (
    <div>
      <div className='contact-me-container'>
        <h1>Contact Me</h1>
        <div className='line-break' />
      </div>
      <Formik
        initialValues={{
          contactName: '',
          contactEmail: '',
          contactSubject: '',
          contactBody: '',
        }}
        validationSchema={Yup.object({
          contactName: Yup.string()
              .required('Required'),
          contactEmail: Yup.string()
              .email('Invalid email address')
              .required('Required'),
          contactSubject: Yup.string()
              .required('Required'),
          contactBody: Yup.string()
              .required('Required')
      })}
        onSubmit={async (values, {resetForm}) => {
          setSubmitClicked(true);
          const messageData = {
            origin: 'TFTE',
            recipient: process.env.REACT_APP_RECIPIENT_EMAIL,
            name: values.contactName,
            email: values.contactEmail,
            subject: values.contactSubject,
            text: values.contactBody,
          };
          await axios.post(`https://portfolio-node-backend.herokuapp.com/email`, { messageData })
          .then((res) => {
            console.log('rES: ', res.data.message);
            setSubmitted(true);
          })
          .catch((err) => {
            setSubmitClicked(false);
            console.log('err: ', err);
          })
        }}
      >
        {!submitted ?
        <Form className='contact-form'>
          <label htmlFor="name">Name</label>
          <Field id="contactName" name="contactName" />
          <ErrorMessage name="contactName" >
            { msg => <div className='contact-form-error'>{msg}</div> }
          </ErrorMessage>

          <label htmlFor="email">Email</label>
          <Field id="contactEmail" name="contactEmail" />
          <ErrorMessage name="contactEmail" >
            { msg => <div className='contact-form-error'>{msg}</div> }
          </ErrorMessage>

          <label htmlFor="subject">Subject</label>
          <Field id="contactSubject" name="contactSubject" />
          <ErrorMessage name="contactSubject" >
            { msg => <div className='contact-form-error'>{msg}</div> }
          </ErrorMessage>

          <label htmlFor="body">Body</label>
          <Field id="contactBody" name="contactBody" as="textarea" />
          <ErrorMessage name="contactBody" >
            { msg => <div className='contact-form-error'>{msg}</div> }
          </ErrorMessage>
          {submitClicked ?
          <h2 className='contact-form-sending'>Sending...</h2>
          : <button type="submit">Send</button>
          }
        </Form>
        :
        <Form className='contact-form-submitted' ref={ref}>
          <h2 className='contact-form-thank'>Thank You!</h2>
          <h2 className='contact-form-thank-message'>Your message has been sent</h2>
        </Form>
        }
      </Formik>
    </div>
  );
};

export default ContactForm;