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

const LoginForm = () => {
    const classes = useStyles()
    return (
        <Box className={classes.wrapper}>
            <Formik
                initialValues={{
                    password: "",
                    email: "",
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email("Invalid email addresss`")
                        .required("Required"),
                    password: Yup.string()
                        .required("Required")
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    await new Promise(r => setTimeout(r, 500));
                    setSubmitting(false);
                }}
            >
                <Form className={classes.container}>
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
                    <Button type="submit" className={classes.submitButton} variant='outlined'>Submit</Button>
                </Form>
            </Formik>
        </Box>
    );
};

export default LoginForm;
