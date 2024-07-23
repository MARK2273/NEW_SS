import * as yup from "yup";

const customerSchema = yup.object().shape({
  customerName: yup.string().required("Name is required"),
  customerEmail: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  customerContact: yup
    .string()
    .matches(/^[0-9]+$/, "Contact must be a number")
    .min(10, "Contact must be at least 10 digits")
    .max(15, "Contact must be at most 15 digits")
    .required("Contact is required"),
});

export default customerSchema;
