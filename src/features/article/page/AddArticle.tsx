import { Box, Button, Container, makeStyles } from '@material-ui/core';
import { Editor } from '@tinymce/tinymce-react';
import { postArticle } from 'features/articles/articlesSlice';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import FormikInput from 'share/components/FormikInput';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import FormikTags from '../../../share/components/FormikTags';
import { getArticle, selectArticle, UpdateArticle } from '../articleSlice';

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
  textEditer: {
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
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
  const { slug }: { slug: string } = useParams();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const article: ArticleType = useAppSelector(selectArticle);
  const [text, setText] = useState('');
  const initialValues: FormInputArticleType = {
    title: slug ? (article.title ? article.title : '') : '',
    description: slug ? (article.description ? article.description : '') : '',
    body: slug ? (article.body ? article.body : '') : '',
    tagList: slug ? (article.tagList ? article.tagList : []) : [],
  };

  useEffect(() => {
    if (slug) {
      dispatch({
        type: getArticle.type,
        payload: slug,
      });
    }
  }, [dispatch, slug]);

  const onSubmit = (values: FormInputArticleType, FormikHelpers: FormikHelpers<any>) => {
    FormikHelpers.setFieldValue('body', text);
    if (slug) {
      dispatch({
        type: UpdateArticle.type,
        payload: { slug: slug, data: { article: values } },
      });
    } else {
      dispatch({
        type: postArticle.type,
        payload: { data: { article: values }, history },
      });
    }
  };
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="md">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values, isValid, dirty, setFieldValue, handleChange }) => {
          return (
            <Form className={classes.form}>
              <div>
                <Box className={classes.title}>
                  <Field label="Article Title" name="title" as={FormikInput} />
                </Box>
                <Box className={classes.title}>
                  <Field label="What's this article about?" name="description" as={FormikInput} />
                </Box>
                <Box className={classes.textEditer}>
                  <Editor
                    apiKey="jb12i6p3jdt0oeipnd0l60gym5ehjx8t67dt4t49tcci14h8"
                    initialValue={values.body}
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount',
                      ],
                      toolbar:
                        'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                      content_style:
                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    }}
                    // onEditorChange={(newText) => setFieldValue('body', newText)}
                    onEditorChange={(e) => {
                      handleChange({ target: { name: 'body', value: e } });
                    }}
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
                // disabled={!isValid || !dirty}
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
