import {
  Button,
  Container,
  makeStyles,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateUser, userSelector } from "../app/reducers/authSlice";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
  header: {
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
  },
  textArea: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    height: "300px",
    padding: "10px",
  },
  button: {
    marginTop: 10,
    float: "right",
  },
  error: {
    color: "red !important",
  },
}));

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required!"),
  email: Yup.string().required("Email is required!"),
  // password: Yup.string().required("Password is required!"),
});

const Settings = () => {
  const currentUser = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const initialValues = currentUser
    ? {
        image: currentUser.image ? currentUser.image : "",
        username: currentUser.username ? currentUser.username : "",
        bio: currentUser.bio ? currentUser.bio : "",
        email: currentUser.email ? currentUser.email : "",
        password: currentUser.password ? currentUser.password : "",
      }
    : {
        image: "",
        username: "",
        bio: "",
        email: "",
        password: "",
      };

  console.log(initialValues, "-", currentUser);

  const onsubmit = (values: any) => {
    const user =
      values.password != ""
        ? {
            image: values.image,
            username: values.username,
            bio: values.bio,
            email: values.email,
            password: values.password,
          }
        : {
            image: values.image,
            username: values.username,
            bio: values.bio,
            email: values.email,
          };

    dispatch(updateUser({ user: user }));
  };

  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" className={classes.header}>
        <strong>Your Settings</strong>
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={onsubmit}
        validationSchema={validationSchema}
      >
        {({ isValid, dirty }) => (
          <Form className={classes.form}>
            <Field
              name="image"
              type="text"
              className={classes.title}
              as={TextField}
              variant="outlined"
              label="URL of profile picture"
            />
            <div className={classes.error}>
              <ErrorMessage name="image" />
            </div>
            <Field
              name="username"
              type="text"
              className={classes.title}
              as={TextField}
              variant="outlined"
              label="User Name"
            />
            <div className={classes.error}>
              <ErrorMessage name="username" />
            </div>
            <Field
              name="bio"
              as={TextareaAutosize}
              className={classes.textArea}
              placeholder="Short bio about you?"
              minRows={10}
            />
            <div className={classes.error}>
              <ErrorMessage name="bio" />
            </div>
            <Field
              name="email"
              type="text"
              className={classes.title}
              as={TextField}
              variant="outlined"
              label="Email"
            />
            <div className={classes.error}>
              <ErrorMessage name="email" />
            </div>
            <Field
              name="password"
              type="password"
              className={classes.title}
              as={TextField}
              variant="outlined"
              label="Password"
            />
            <div className={classes.error}>
              <ErrorMessage name="password" />
            </div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={!isValid || !dirty}
              type="submit"
            >
              Update Settings
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Settings;
