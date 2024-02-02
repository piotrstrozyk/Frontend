import { useFormik } from 'formik';
import registrationSchema from '../../schemas/RegistrationSchema';
import { useEffect, useRef } from 'react';

const onSubmit = async (values, actions) => {
    fetch("http://localhost:7000/register", {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
    })
    .then((data) => {
      if(data.status===201) {
        alert('Registered, please log in');
        
      } else if (data.status===500) {
        alert('Email already in use');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    actions.resetForm()
}

const RegistrationForm = () => {
    const {values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            name: "",
            surname: "",
            nick: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: registrationSchema,
        onSubmit,
    });
    console.log(errors);

    
    const nameInputRef = useRef(null);

    useEffect(() => {
      nameInputRef.current.focus();
    }, []);
  


    return (
        <form className="max-w-md mx-auto mt-8 p-4 bg-gray-800 text-white rounded" onSubmit={handleSubmit} autoComplete='off'>
            <label className="block text-sm font-semibold" htmlFor='name'>Name</label>
            <input
                id='name' 
                type='name' 
                placeholder='Enter your name'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.name && touched.name ? "input-error" : ""}
                ref={nameInputRef}
                 />
            {errors.name && touched.name && <p className="error">{errors.name}</p>}            
            <label className="block text-sm font-semibold" htmlFor='surname'>Surname</label>
            <input
                id='surname' 
                type='surname' 
                placeholder='Enter your surname'
                value={values.surname}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.surname && touched.surname ? "input-error" : ""}
                 />
            {errors.surname && touched.surname && <p className="error">{errors.surname}</p>}
            <label className="block text-sm font-semibold" htmlFor='nick'>Nick</label>
            <input
                id='nick' 
                type='nick' 
                placeholder='Enter your nick'
                value={values.nick}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.nick && touched.nick ? "input-error" : ""}
                 />
            {errors.nick && touched.nick && <p className="error">{errors.nick}</p>}
            <label className="block text-sm font-semibold" htmlFor='email'>Email</label>
            <input
                id='email' 
                type='email' 
                placeholder='Enter your email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email && touched.email ? "input-error" : ""}
                 />
            {errors.email && touched.email && <p className="error">{errors.email}</p>}
            <label className="block text-sm font-semibold" htmlFor='password'>Password</label>
            <input
                id='password' 
                type='password' 
                placeholder='Enter your password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.password && touched.password ? "input-error" : ""}
             />
             {errors.password && touched.password && <p className="error">{errors.password}</p>}
             <label className="block text-sm font-semibold" htmlFor='confirmPassword'>Confirm Password</label>
            <input
                id='confirmPassword' 
                type='password' 
                placeholder='Enter your password'
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.confirmPassword && touched.confirmPassword ? "input-error" : ""}
             />
             {errors.confirmPassword && touched.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
             <button className="btn-style mt-4" disabled={isSubmitting} type='submit'>Submit</button>
        </form>
    );
};
export default RegistrationForm;