import * as Yup from 'yup';

export const signUpDefaultValues = {
    email: '',
    password: '',
    userName: '',
    verifyPassword: ''
};


export const ValidationSchema = Yup?.object()?.shape({
    email: Yup?.string()?.email('Invalid email address').required('email is required'),
    password: Yup.string().required('Password is required').min(8, 'Must be at least 8 characters').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, 'Your password is weak'),
    verifyPassword: Yup.string().required('required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
    userName: Yup.string().required('required').matches(/^\S*$/, 'No spaces').min(3, 'Must be at least 3 characters'),
});

export const loginValidationSchema = Yup?.object()?.shape({
    email: Yup?.string()?.email('Invalid email address').required('email is required'),
    password: Yup.string().required('Password is required').min(8, 'Must be at least 8 characters'),
 
});

export const loginDefaultValues = {
    email: '',
    password: '',
    userName: '',
  
};
