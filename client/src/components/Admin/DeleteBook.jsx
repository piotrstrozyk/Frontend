import { useFormik } from 'formik';
import BookSchema from './DeleteSchema';
import { useEffect, useRef } from 'react';

const onSubmit = async (values, actions) => {
    fetch(`http://localhost:7000/admin/book/${values.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
    .then((data) => {
      if(data.status===201) {
        alert('Book deleted');
        
      } else if (data.status===500) {
        alert('Failed');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    actions.resetForm()
}

const Delete = () => {
    const {values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            id: "",
        },
        validationSchema: BookSchema,
        onSubmit,
    });
    console.log(errors);

    
    const nameInputRef = useRef(null);

    useEffect(() => {
      nameInputRef.current.focus();
    }, []);
  


    return (
        <form className="max-w-md mx-auto mt-8 p-4 bg-gray-800 text-white rounded" onSubmit={handleSubmit} autoComplete='off'>
                <label className="block text-sm font-semibold" htmlFor='id'>Id</label>
            <input
                id='id' 
                type='id' 
                placeholder='Enter your id'
                value={values.id}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.id && touched.id ? "input-error" : ""}
                ref={nameInputRef}
                 />
            {errors.id && touched.id && <p className="error">{errors.id}</p>}      
    
             <button className="btn-style mt-4" disabled={isSubmitting} type='submit'>Submit</button>
        </form>
    );
};
export default Delete;