import {
  Button,
  Container,
  makeStyles,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  articlesAsync,
  createArticle,
  selectArticles,
} from "../app/reducers/articlesSlice";
import FormikTags from "../common/Form/FormikTags";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(3),
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
  title: Yup.string().required("This field is required!"),
  body: Yup.string().required("This field is required!"),
  description: Yup.string().required("This field is required!"),
  tagList: Yup.array().min(1).required("This field is required!"),
});

function AddArticle() {
  const dispatch = useAppDispatch();
  const a = useAppSelector(selectArticles);

  const onSubmit = (values: any) => {
    dispatch(createArticle({ article: values }));
  };
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <Formik
        initialValues={{
          title: "",
          description: "",
          body: "",
          tagList: [],
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ isValid, dirty, values, setFieldValue }) => {
          return (
            <Form className={classes.form}>
              <div>
                <Field
                  name="title"
                  type="text"
                  className={classes.title}
                  as={TextField}
                  variant="outlined"
                  label="Article Title"
                />
                <div className={classes.error}>
                  <ErrorMessage name="title" />
                </div>
                <Field
                  name="description"
                  className={classes.title}
                  as={TextField}
                  variant="outlined"
                  label="What's this article about?"
                />
                <div className={classes.error}>
                  <ErrorMessage name="description" />
                </div>
                <Field
                  name="body"
                  as={TextareaAutosize}
                  className={classes.textArea}
                  placeholder="What's this article about?"
                  minRows={10}
                />
                <div className={classes.error}>
                  <ErrorMessage name="body" />
                </div>
                <FormikTags
                  tagList={values.tagList}
                  setFieldValue={setFieldValue}
                  component={TextField}
                />
                {/* <div className={classes.error}>
                  <ErrorMessage name="tagList" />
                </div> */}
              </div>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={!isValid || !dirty}
                type="submit"
              >
                Publish Article
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}

export default AddArticle;
