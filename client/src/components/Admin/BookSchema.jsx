import * as yup from "yup";

const bookSchema = yup.object().shape({
    title: yup.string().required("Required"),
    cover: yup.string().required("Required"),
    author: yup.string().required("Required"),
    description: yup.string().required("Required"),
    genre: yup.string().required("Required"),
    date: yup.number().required("Required"),
    publisher: yup.string().required("Required"),
    publishingYear: yup.number().required("Required"),

    
})

export default bookSchema