import * as yup from "yup";

const loginSchema = yup.object().shape({
    title: yup.string().required("Required"),
    
})

export default loginSchema