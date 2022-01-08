import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import axios from 'axios';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import '../styles/edit-post-form.css';
import { findCategoryNumber } from '../helpers/categoryMapping.js';
import { useAuth0 } from "@auth0/auth0-react";

const RTE = ({ field, form, ...props }) => {
    // console.log('Field: ', field);
    // console.log('form: ', form);
    // console.log('Props: ', props);
    const change = (content) => {
        form.setFieldValue(field.name, content.value);
    }

    return (
        <RichTextEditorComponent htmlAttributes={{ name: field.name }} value={field.value} change={change.bind(this)}>
            <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
        </RichTextEditorComponent>
    );
};

const EditPostForm = (props) => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const today = moment().format('YYYY-MM-DD');
    let history = useHistory();

  return(
        <Formik
            enableReinitialize={true}
            initialValues={{ 
                updated_date: today,
                title: props.postData.title || '',
                category: props.postData.category || '',
                image_url: props.postData.image_url || '',
                blurb: props.postData.blurb || '',
                content: props.postData.content || ''
            }}
            validationSchema={Yup.object({
                title: Yup.string()
                    .required('Required'),
                category: Yup.string()
                    .required('Required'),
                image_url: Yup.string()
                    .required('Required'),
                blurb: Yup.string()
                    .required('Required'),
                content: Yup.string()
                    .required('Required')
            })}
            onSubmit={ async (values, { setSubmitting }) => {
                console.log(values);
                values['category_int'] = findCategoryNumber(values.category);
                const token = await getAccessTokenSilently();
                console.log('Token: ', token);
                axios.put(`${process.env.REACT_APP_SERVER_URL}/posts/${props.postData.id}`, values, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res =>  {
                    console.log(`Successfully updated post with id ${props.postData.id}`, res);
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
                    <option value="product_reviews">Product Reviews</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="for_the_home">For The Home</option>
                </Field>

                <label htmlFor="image_url">Image URL</label>
                <Field name="image_url" type="text" />
                <ErrorMessage name="image_url" />

                <label htmlFor="blurb">Blurb</label>
                <Field name="blurb" type="text" as="textarea" className="blurb"/>
                <ErrorMessage name="blurb" />

                <Field name="content" type="html" component={RTE} className="main-content"/>
                <ErrorMessage name="content" />

                <div className='form-button-container'>
                    <button type="submit">Submit</button>
                </div>
            </Form>
      </Formik>
  );
};

export default EditPostForm;