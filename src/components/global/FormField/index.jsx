import React from 'react'
import { ErrorMessage,Field} from 'formik';

export const FormField=({type='text',name,label})=> {
    return (
        <label>
            {label}
            <Field type={type} name={name} />
            <ErrorMessage className='error' component='div' name={name}/>
        </label>
    )
}
