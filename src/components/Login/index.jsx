import React,{useState} from 'react'
import { useHistory} from 'react-router-dom';
import { Formik, Form } from 'formik';
import { FormField } from 'components';
import { useFirebase } from 'service';
import {loginValidationSchema,loginDefaultValues } from '../utilis';


export const Login = () => {
    const { push } = useHistory();
    const { auth} = useFirebase();
    const [serverError, setServerError] = useState('');
    
    const login = ({ email, password },{setSubmitting}) => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(res => {
                if (!res?.user) {
                    setServerError('We are having trouble logging you in.please try again');
                }
    })
            .catch(error => {
                if (error?.code === 'auth/wrong-password') {
                    setServerError('Invalid credentials');
                } else if (error?.code === 'auth/user-not-found') {
                    setServerError('No account for this email')
                } else {
                    setServerError('something went wrong :(')
                }
            }
            
        )
        .finally(()=>setSubmitting(false))
        }
    
    return (
        <div className='auth-form'>
            <h1>Login</h1>
            <Formik
                onSubmit={login}
                initialValues={ loginDefaultValues}
                validationSchema={loginValidationSchema}
            >
                {({ isSubmitting,isValid}) => (
                    <Form>
                        <FormField name='email' label='Email' type='email'/>
                        <FormField name='password' label='Password' type='password' />
                        <div className='auth-link-container'>
                           Dont't have an account ?{''}
                            <span className='auth-link' onClick={()=>push('SignUp')}>
                            Sign Up
                            </span>
                        </div>
                        <button disabled={!isValid || isSubmitting} type='submit'>
                          Login
                        </button>

                    </Form>
                )}

                
            </Formik>
            {!!serverError && <div className='error'>{serverError}</div>}
        </div>
    )
}
