import React from "react";
import { Formik, Form, useField, FieldHookConfig } from "formik";
import * as Yup from "yup";
import { TextField, Box, Button } from "@material-ui/core";
import { useStyles } from "./style";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { userLogin } from "data/fetch/userFetch";

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
    let history = useHistory()
    const [response, setResponse] = React.useState('');
    const loginUserMutation = useMutation(userLogin);
    const { t } = useTranslation();

    const handleSubmit = async (values: {
        password: string,
        email: string
    }) => {
        const res = await loginUserMutation.mutateAsync({ email: values.email, password: values.password });
        if (res.id) {
            setResponse('success');
            history.push('/');
        }
        else {
            setResponse(res.message);
        }
    }
    return (
        <Box className={classes.wrapper}>
            <Formik
                initialValues={{
                    password: "",
                    email: "",
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email(t("Invalid email addresss`"))
                        .required(t("Required")),
                    password: Yup.string()
                        .required(t("Required"))
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    await handleSubmit(values)
                    setSubmitting(false);
                }}
            >
                <Form className={classes.container}>
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
                    <Button type="submit" className={classes.submitButton} variant='outlined'>{t("Submit")}</Button>
                </Form>
            </Formik>
        </Box>
    );
};

export default LoginForm;
