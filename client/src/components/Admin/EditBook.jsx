import { useFormik } from 'formik';
import BookSchema from './EditBookSchema';
import { useEffect, useRef } from 'react';

const onSubmit = async (values, actions) => {
    fetch(`http://localhost:7000/admin/book/patch/${values.id}`, {
        method: 'PATCH',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
    })
    .then((data) => {
      if(data.status===201) {
        alert('Book edited');
        
      } else if (data.status===500) {
        alert('Failed');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    actions.resetForm()
}

const BookEdit = () => {
    const {values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            id: "",
            title: "",
            cover: "",
            author: "",
            description: "",
            genre: "",
            date: "",
            publisher: "",
            publishingYear: "",
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
            <label className="block text-sm font-semibold" htmlFor='title'>Title</label>
            <input
                id='title' 
                type='title' 
                placeholder='Enter your title'
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.name && touched.name ? "input-error" : ""}
                ref={nameInputRef}
                 />
            {errors.name && touched.name && <p className="error">{errors.name}</p>}            
            <label className="block text-sm font-semibold" htmlFor='cover'>Cover</label>
            <input
                id='cover' 
                type='cover' 
                placeholder='Enter cover link'
                value={values.cover}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.cover && touched.cover ? "input-error" : ""}
                 />
            {errors.surname && touched.surname && <p className="error">{errors.surname}</p>}
            <label className="block text-sm font-semibold" htmlFor='author'>Author</label>
            <input
                id='author' 
                type='author' 
                placeholder='Enter your author'
                value={values.author}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.author && touched.author ? "input-error" : ""}
                 />
            {errors.author && touched.author && <p className="error">{errors.author}</p>}
            <label className="block text-sm font-semibold" htmlFor='description'>Description</label>
            <input
                id='description' 
                type='description' 
                placeholder='Enter your description'
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.description && touched.description ? "input-error" : ""}
                 />
            {errors.description && touched.description && <p className="error">{errors.description}</p>}
            <label className="block text-sm font-semibold" htmlFor='genre'>Genre</label>
            <input
                id='genre' 
                type='genre' 
                placeholder='Enter your genre'
                value={values.genre}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.genre && touched.genre ? "input-error" : ""}
             />
             {errors.genre && touched.genre && <p className="error">{errors.genre}</p>}
             <label className="block text-sm font-semibold" htmlFor='date'>Date</label>
            <input
                id='date' 
                type='number' 
                placeholder='Enter the date'
                value={values.date}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.date && touched.date ? "input-error" : ""}
             />
             {errors.date && touched.date && <p className="error">{errors.date}</p>}
                      <label className="block text-sm font-semibold" htmlFor='publisher'>Publisher</label>
            <input
                id='publisher' 
                type='publisher' 
                placeholder='Enter the publisher'
                value={values.publisher}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.publisher && touched.publisher ? "input-error" : ""}
             />
             {errors.publisher && touched.publisher && <p className="error">{errors.publisher}</p>}
             <label className="block text-sm font-semibold" htmlFor='publishingYear'>publishingYear</label>
            <input
                id='publishingYear' 
                type='publishingYear' 
                placeholder='Enter the publishingYear'
                value={values.publishingYear}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.publishingYear && touched.publishingYear ? "input-error" : ""}
             />
             {errors.publishingYear && touched.publishingYear && <p className="error">{errors.publishingYear}</p>}
    
             <button className="btn-style mt-4" disabled={isSubmitting} type='submit'>Submit</button>
        </form>
    );
};
export default BookEdit;