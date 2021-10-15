import React from "react";
import { Formik, Form, useField, FieldHookConfig } from "formik";
import * as Yup from "yup";
import { TextField, Box, Button, Typography } from "@material-ui/core";
import { useStyles } from "./style";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();
    return (
        <Box className={classes.wrapper}>
            <Formik
                initialValues={{
                    login: "",
                    email: "",
                    password: "",
                    passwordConfirmation: "",
                }}
                validationSchema={Yup.object({
                    login: Yup.string()
                        .max(15, t("Must be 15 characters or less"))
                        .min(5, t("Must be 5 characters or more"))
                        .required("Required")
                        .matches(/[a-zA-Z]/, t('Login can only contain Latin letters')),
                    email: Yup.string()
                        .email(t("Invalid email addresss"))
                        .required(t("Required")),
                    password: Yup.string()
                        .required(t("Required"))
                        .min(8, t('Password is too short - should be 8 characters minimum'))
                        .max(15, t('Password is too long - should be 15 characters maximum')),
                    passwordConfirmation: Yup.string()
                        .oneOf([Yup.ref('password'), null], t('Passwords must match'))
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    await new Promise(r => setTimeout(r, 500));
                    setSubmitting(false);
                }}
            >
                <Form className={classes.container}>
                    <MyTextInput
                        label={t("Login")}
                        name="login"
                        type="text"
                        placeholder="login"
                    />
                    <MyTextInput
                        label={t("Email Address")}
                        name="email"
                        type="email"
                        placeholder="email"
                    />
                    <MyTextInput
                        label={t("Password")}
                        name="password"
                        type="password"
                        placeholder="password"
                    />
                    <MyTextInput
                        label={t("Password Confirmation")}
                        name="passwordConfirmation"
                        type="password"
                        placeholder="Password Confirmation"
                    />
                    <Button type="submit" className={classes.submitButton} variant='outlined'>{t('Submit')}</Button>
                </Form>
            </Formik>
        </Box>
    );
};

export default RegisterForm;
