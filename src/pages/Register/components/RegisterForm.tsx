import React, { useEffect } from "react";
import { Formik, Form, useField, useFormikContext, FieldHookConfig } from "formik";
import * as Yup from "yup";

interface OtherProps {
    label: string
}
const MyTextInput = (props: OtherProps & FieldHookConfig<string>) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{props.label}</label>
            <input className="text-input" {...field} placeholder={props.placeholder} type={props.type} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

const RegisterForm = () => {
    return (
        <>
            <h1>Subscribe!</h1>
            <Formik
                initialValues={{
                    login: "",
                    email: "",
                }}
                validationSchema={Yup.object({
                    login: Yup.string()
                        .max(15, "Must be 15 characters or less")
                        .min(5, "Must be 5 characters or more")
                        .required("Required")
                        .matches(/[a-zA-Z]/, 'Login can only contain Latin letters.'),
                    email: Yup.string()
                        .email("Invalid email addresss`")
                        .required("Required"),
                    password: Yup.string()
                        .required("Required")
                        .min(8, 'Password is too short - should be 8 characters minimum.')
                        .max(15, 'Password is too long - should be 15 characters maximum.'),
                    passwordConfirmation: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    await new Promise(r => setTimeout(r, 500));
                    setSubmitting(false);
                }}
            >
                <Form>
                    <MyTextInput
                        label="Login"
                        name="login"
                        type="text"
                        placeholder="login"
                    />
                    <MyTextInput
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="email"
                    />
                    <MyTextInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="password"
                    />
                    <MyTextInput
                        label="Password Confirmation"
                        name="passwordConfirmation"
                        type="password "
                        placeholder="Password Confirmation"
                    />

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </>
    );
};

export default RegisterForm;
