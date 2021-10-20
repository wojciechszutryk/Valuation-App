import React from "react";
import { Formik, Form, useField, FieldHookConfig } from "formik";
import * as Yup from "yup";
import { TextField, Box, Button } from "@material-ui/core";
import { useStyles } from "./style";
import { useTranslation } from "react-i18next";
import { showToast } from "utils";
import ClipLoader from "react-spinners/ClipLoader";
import { useMutation } from "react-query";
import { userSignUp } from "data/fetch/userFetch";
import { useHistory } from "react-router-dom";

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
    let history = useHistory()
    const registerUserMutation = useMutation(userSignUp);

    const handleSubmit = async (
        userName: string,
        password: string,
        email: string
    ) => {
        const res = await registerUserMutation.mutateAsync({ email, password, userName });
        if (res.id) {
            showToast(t('Registered succesfully, you can log in'))
            history.push('/login');
        }
        else {
            showToast(t('Register failed, try again') + '. ' + res.message)
        }
    }
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
                    await handleSubmit(values.login, values.password, values.email)
                    setSubmitting(false);
                }}
            >
                {props => (<Form className={classes.container}>
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
                    {!props.isSubmitting ? <Button type="submit" className={classes.submitButton} variant='outlined'>{t("Submit")}</Button> : <Button disabled type="submit" className={classes.submitButton} variant='outlined'><ClipLoader /></Button>}
                </Form>
                )}
            </Formik>
        </Box>
    );
};

export default RegisterForm;
