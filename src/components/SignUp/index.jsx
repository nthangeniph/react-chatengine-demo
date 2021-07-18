import React, { useState } from 'react';
import { useHistory} from 'react-router-dom';
import { Formik, Form } from 'formik';
import { FormField } from 'components';
import {useFirebase} from 'service'
import {ValidationSchema,signUpDefaultValues } from '../utilis';

export const SignUp = () => {
    const { push } = useHistory();

    const { auth,firestore} = useFirebase();
    
    const [serverError, setServerError] = useState('');
    
    const signUp = ({ email, userName, password }, { setSubmitting }) => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
                if (res?.user?.uid) {
                    fetch('/api/createUser', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify( {
                            userName,
                            userId: res.user.uid,
                        })
                    }
                    )
                    
                        .then(() => {
                            firestore
                                .collection('chatUsers')
                                .doc(res?.user?.uid)
                                .set({ userName, avatar: '' })
                        })
                }
            }
            ).catch(error => {
                if (error?.code === 'auth/email-already-in-use') {
                    setServerError('An account with this email already exists');
                }
                else {
                    setServerError("we're having trouble signing you up.Please try again Later")
                }
            })
        .finally(()=>setSubmitting(false))
    }
         
    return (
        <div className='auth-form'> 
            <h1>Sign Up</h1>
            <Formik
                onSubmit={signUp}
                validateOnMount={true}
                initialValues={signUpDefaultValues}
                validationSchema={ValidationSchema}

            >
                {({ isValid, isSubmitting }) => (
                    <Form>
                        <FormField name='userName' label='Username' />
                        <FormField name='email' label='Email' type='email' />
                        <FormField name='password' label='Password' type='password' />
                        <FormField name='verifyPassword' label='Verify Password' type='password' />

                        <div className='auth-link-container'>
                            Already have an account?{''}
                            <span className='auth-link' onClick={()=>push('Login')}>
                            Log In!
                            </span>
                        </div>
                        <button disabled={!isValid || isSubmitting} type='submit'>
                            Sign Up
                        </button>
                    </Form>
                )
                }

            </Formik>
            {!!serverError && <div className='error'>{serverError}</div>}
      
        </div>
    )
}
