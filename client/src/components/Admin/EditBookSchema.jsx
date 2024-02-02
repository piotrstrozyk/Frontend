import * as yup from "yup";

const bookSchema = yup.object().shape({
    id: yup.string().required("Required"),
    title: yup.string(),
    cover: yup.string(),
    author: yup.string(),
    description: yup.string(),
    genre: yup.string(),
    date: yup.number(),
    publisher: yup.string(),
    publishingYear: yup.number(),

    
})

export default bookSchema