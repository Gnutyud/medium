import { Box } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  getListArticle,
  selectListArticles,
  selectLoadingArticles,
  selectNumberArticlePerPage,
  selectNumberCurrentPage,
  setNumberCurrentPage,
} from 'features/articles/articlesSlice';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { setInAuthorPage } from '../authorSlice';
import AuthorHeader from '../components/AuthorHeader';
import AuthorProfileComponent from '../components/AuthorProfileComponent';

const queryString = require('query-string');

const AuthorPage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  // select author name from url
  const { authorname } = useParams<{ authorname: string }>();

  // select data from store
  const articleList = useAppSelector(selectListArticles);
  const isLoading = useAppSelector(selectLoadingArticles);

  // select data for pagination from store
  const currentPage = useAppSelector(selectNumberCurrentPage);
  const articlePerPage = useAppSelector(selectNumberArticlePerPage);

  // get page from url param
  const { page } = queryString.parse(location.search);
  const offsetIndex = +page - 1 || currentPage - 1;

  // set initial value of current page
  useEffect(() => {
    dispatch(setNumberCurrentPage(1));
  }, [dispatch]);

  // persist state first time of is in author page
  dispatch(setInAuthorPage(true));
  localStorage.setItem('inAuthorPage', 'true');

  // fetch list articles + pagination by offset + author
  useEffect(() => {
    const action = {
      type: getListArticle.type,
      payload: {
        offset: offsetIndex * articlePerPage,
        limit: articlePerPage,
        author: authorname,
      },
    };
    dispatch(action);
  }, [authorname, offsetIndex, articlePerPage, dispatch]);

  // get author info (must use profile slice later!!)
  const authorInfo = articleList?.[0]?.author;

  console.log('article list ', articleList);
  return (
    <Box>
      <AuthorHeader author={authorInfo} />
      <AuthorProfileComponent author={authorInfo} articleList={articleList} isLoading={isLoading} />
    </Box>
  );
};

export default AuthorPage;
