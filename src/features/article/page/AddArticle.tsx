import { Box, Button, Container, makeStyles } from '@material-ui/core';
import { postArticle } from 'features/articles/articlesSlice';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import FormikInput from 'share/components/FormikInput';
import * as Yup from 'yup';
import { useAppDispatch } from '../../../app/hooks';
import FormikTags from '../../../share/components/FormikTags';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(3),
  },
  title: {
    marginTop: 15,
    marginBottom: 15,
    width: '100%',
  },
  button: {
    marginTop: 10,
    float: 'right',
  },
  error: {
    color: 'red !important',
  },
}));

const validationSchema = Yup.object().shape({
  title: Yup.string().required('This field is required!'),
  body: Yup.string().required('This field is required!'),
  description: Yup.string().required('This field is required!'),
  tagList: Yup.array()
    .min(1, 'tagList must have at least 1 tag')
    .required('This field is required!'),
});

function AddArticle() {
  const dispatch = useAppDispatch();

  const onSubmit = (values: FormInputArticleType) => {
    //   dispatch(createArticle({ article: values }));
    dispatch({
      type: postArticle.type,
      payload: { article: values },
    });
  };
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <Formik
        initialValues={{
          title: '',
          description: '',
          body: '',
          tagList: [],
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ isValid, dirty }) => {
          return (
            <Form className={classes.form}>
              <div>
                <Box className={classes.title}>
                  <Field label="Article Title" name="title" as={FormikInput} />
                </Box>
                <Box className={classes.title}>
                  <Field label="What's this article about?" name="description" as={FormikInput} />
                </Box>
                <Box className={classes.title}>
                  <Field
                    label="Write your article (in markdown)"
                    name="body"
                    multiline={true}
                    minsRow={10}
                    as={FormikInput}
                  />
                </Box>
                <Field name="tagList" component={FormikTags} />
                <div className={classes.error}>
                  <ErrorMessage name="tagList" />
                </div>
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
