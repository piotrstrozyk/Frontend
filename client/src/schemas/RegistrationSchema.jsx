import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const registrationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    surname: yup.string().required("Required"),
    nick: yup.string().required("Required"),
    email: yup.string().email("Please enter valid email").required("Required"),
    password: yup
    .string()
    .min(5)
    .matches(passwordRules, {message: "Please create a stronger password"})
    .required("Required"),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required")
})

export default registrationSchema