import {
  Button,
  Container,
  makeStyles,
  TextareaAutosize,
  TextField,
  Typography,
} from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Alert from '@material-ui/lab/Alert';
import { RootState } from 'app/store';
import { getUser, selectUser, updateUser } from '../settingSlice';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
  header: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
  },
  textArea: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    height: '300px',
    padding: '10px',
  },
  button: {
    marginTop: 10,
    float: 'right',
  },
  error: {
    color: 'red !important',
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required!'),
  email: Yup.string().required('Email is required!'),
  image: Yup.string().required('Url image is required').url('Must be Url'),
  // password: Yup.string().required("Password is required!"),
});

const SettingPage = () => {
  const currentUser = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: getUser.type,
    });
  }, [dispatch]);

  const initialValues = currentUser
    ? {
        image: currentUser.image ? currentUser.image : '',
        username: currentUser.username ? currentUser.username : '',
        bio: currentUser.bio ? currentUser.bio : '',
        email: currentUser.email ? currentUser.email : '',
        password: currentUser.password ? currentUser.password : '',
      }
    : {
        image: '',
        username: '',
        bio: '',
        email: '',
        password: '',
      };

  const onsubmit = (values: any, form: any) => {
    const user =
      values.password != ''
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
    dispatch({
      type: updateUser.type,
      payload: { user: user },
    });
    setTimeout(() => {
      form.setSubmitting(false);
    }, 4000);
  };

  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" className={classes.header}>
        <strong>Your Settings</strong>
      </Typography>
      {currentUser && (
        <Formik
          initialValues={initialValues}
          onSubmit={onsubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
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
              {isSubmitting && (
                <div className={classes.root}>
                  <Alert severity="success">This is a success alert — check it out!</Alert>
                </div>
              )}
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={isSubmitting}
                type="submit"
              >
                Update Settings
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Container>
  );
};

export default SettingPage;
