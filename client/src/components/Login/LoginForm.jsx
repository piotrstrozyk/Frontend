import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';

const onSubmit = async (values, actions) => {
    fetch("http://localhost:7000/login", {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
    })
    .then((data) => {
      if(data.status===201) {
        alert('Log In successful');
      } else if (data.status===404) {
        alert('Incorrect Login');
      } else if (data.status===500) {
        alert('Incorrect Password')
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    actions.resetForm()
}

const LoginForm = () => {
    const {values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit,
    });
    console.log(errors);

    const emailInputRef = useRef(null);

    useEffect(() => {
      emailInputRef.current.focus();
    }, []);
  

    return (
        <form onSubmit={handleSubmit} autoComplete='off' className="login-form max-w-md mx-auto mt-8 p-4 bg-gray-800 text-white rounded">
            <label className="login-form block text-sm font-semibold" htmlFor='email'>Email</label>
            <input
                id='email' 
                type='email' 
                placeholder='Enter your email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email && touched.email ? "input-error" : ""}
                ref={emailInputRef}
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
             <button className="btn-style mt-4" disabled={isSubmitting} type='submit'>Submit</button>
        </form>
    );
};
export default LoginForm;