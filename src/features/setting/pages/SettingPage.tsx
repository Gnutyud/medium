import { Box, Button, Container, makeStyles, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import FormikInput from 'share/components/FormikInput';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getUser, selectError, selectUser, updateUser } from '../settingSlice';

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
  button: {
    marginTop: 10,
    float: 'right',
    marginBottom: '40px',
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
  bio: Yup.string().required('Bio is required!'),
});

const SettingPage = () => {
  const currentUser = useAppSelector(selectUser);
  const errMessage = useAppSelector(selectError);
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
      values.password !== ''
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
    }, 3000);
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
              {isSubmitting && (
                <div className={classes.root}>
                  {errMessage ? (
                    <Alert severity="error">
                      {errMessage.email && `Email ${errMessage.email}`}
                      {errMessage.username && ` Username ${errMessage.username}`}
                    </Alert>
                  ) : (
                    <Alert severity="success">Update successful!</Alert>
                  )}
                </div>
              )}
              <Box className={classes.title}>
                <Field label="image" name="image" as={FormikInput} />
              </Box>
              <Box className={classes.title}>
                <Field label="username" name="username" as={FormikInput} />
              </Box>
              <Box className={classes.title}>
                <Field label="bio" name="bio" multiline={true} minsRow={10} as={FormikInput} />
              </Box>
              <Box className={classes.title}>
                <Field label="email" name="email" as={FormikInput} />
              </Box>
              <Box className={classes.title}>
                <Field label="password" name="password" type="password" as={FormikInput} />
              </Box>
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
