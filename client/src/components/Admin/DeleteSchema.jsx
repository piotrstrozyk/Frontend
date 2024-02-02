import * as yup from "yup";

const bookSchema = yup.object().shape({
    id: yup.string().required("Required"),
})

export default bookSchema