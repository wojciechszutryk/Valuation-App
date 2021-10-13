import React from "react";
import { Formik, Form, useField, FieldHookConfig } from "formik";
import * as Yup from "yup";
import { TextField, Box, Button, Typography } from "@material-ui/core";
import { useStyles } from "./style";

const MyTextInput = (props: {
    label: string
} & FieldHookConfig<string>) => {
    const classes = useStyles()
    const [field, meta] = useField(props);
    return (
        <TextField error={!!meta.touched && !!meta.error} className={classes.input} label={props.label} variant="outlined" type={props.type} helperText={!!meta.touched && !!meta.error ? meta.error : ' '} {...field} />
    );
};

const RegisterForm = () => {
    const classes = useStyles()
    return (
        <>
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
                <Form className={classes.container}>
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
                        type="password"
                        placeholder="Password Confirmation"
                    />
                    <Button type="submit" className={classes.submitButton} variant='outlined'>Submit</Button>
                </Form>
            </Formik>
        </>
    );
};

export default RegisterForm;
