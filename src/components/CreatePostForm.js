import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import axios from 'axios';

const CreatePostForm = () => {
    const today = moment().format('YYYY-MM-DD');
    let history = useHistory();
  return(
        <Formik
            initialValues={{ 
                created_date: today,
                title: '',
                category: '',
                image_url: '',
                blurb: '',
                content: ''
            }}
            validationSchema={Yup.object({
                title: Yup.string()
                    .required('Required'),
                category: Yup.string()
                    .required('required'),
                image_url: Yup.string()
                    .required('Required'),
                blurb: Yup.string()
                    .required('Required'),
                content: Yup.string()
                    .required('Required')
            })}
            onSubmit={(values, { setSubmitting }) => {
                axios.post('http://localhost:9001/posts', values)
                .then(res =>  {
                    console.log('Successfully posted: ', res);
                    setSubmitting(false);
                    history.push('/admin');
                })
                .catch(err => {
                    console.log('Error posting', err);
                })
              }}
        >
            <Form>
                <label htmlFor="title">Title</label>
                <Field name="title" type="text" />
                <ErrorMessage name="title" />

                <label htmlFor="category">Category</label>
                <Field as="select" name="category">
                    <option value="">Select a category</option>
                    <option value="minimalism">Minimalism</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="forthehome">For The Home</option>
                </Field>

                <label htmlFor="image_url">Image URL</label>
                <Field name="image_url" type="text" />
                <ErrorMessage name="image_url" />

                <label htmlFor="blurb">Blurb</label>
                <Field name="blurb" type="text" as="textarea" className="blurb"/>
                <ErrorMessage name="blurb" />

                <label htmlFor="content">Main Content</label>
                <Field name="content" type="text" as="textarea" className="main-content"/>
                <ErrorMessage name="blurb" />

                <button type="submit">Submit</button>
            </Form>
      </Formik>
  );
};

export default CreatePostForm;