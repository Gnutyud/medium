import { AppBar, Box, Button, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  getListArticle,
  selectCountArticles,
  selectListArticles,
  selectLoadingArticles,
  selectNumberArticlePerPage,
  selectNumberCurrentPage,
  setNumberCurrentPage,
} from 'features/articles/articlesSlice';
import { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { setInAuthorPage } from '../authorSlice';
import clsx from 'clsx';

const queryString = require('query-string');

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  leftContentContainer: {
    display: 'flex',
    flex: '1',
  },
  rightContentContainer: {
    cursor: 'pointer',
  },
  leftContentItem: {
    marginRight: '20px',
  },
  leftBrand: {
    fontSize: '1.6rem',
  },
}));

const AuthorPage = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useAppDispatch();

  // select author name from url
  const { authorname } = useParams<{ authorname: string }>();

  // select data from store
  const articleList = useAppSelector(selectListArticles);
  const isLoading = useAppSelector(selectLoadingArticles);

  // select data for pagination from store
  const currentPage = useAppSelector(selectNumberCurrentPage);
  const articlePerPage = useAppSelector(selectNumberArticlePerPage);
  const totalArticle = useAppSelector(selectCountArticles);

  // get page from url param
  const { page } = queryString.parse(location.search);
  const offsetIndex = +page - 1 || currentPage - 1;

  // set initial value of current page
  useEffect(() => {
    dispatch(setNumberCurrentPage(1));
  }, [dispatch]);

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

  // handle event go to home page
  const handleGoToHomePage = () => {
    history.push('/');
    dispatch(setInAuthorPage(false));
  };

  // get author info (must use profile slice later!!)
  const authorInfo = articleList?.[0]?.author;
  const username = authorInfo?.username;
  const bio = authorInfo?.bio;
  const following = authorInfo?.following;
  const image = authorInfo?.image;

  // log
  // console.log('article list ', articleList, isLoading);
  // console.log('author name ', authorname);
  console.log('author info ', authorInfo);
  // console.log('in author page!!');
  // console.log('username ', username);
  // console.log(articleList, isLoading);
  // console.log('current page ', currentPage);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Box className={classes.leftContentContainer}>
            <Typography className={clsx(classes.leftContentItem, classes.leftBrand)}>
              {username}
            </Typography>
            <Typography className={classes.leftContentItem} onClick={handleGoToHomePage}>
              {totalArticle} articles
            </Typography>
            <Button color="inherit">Follow</Button>
          </Box>
          <Box className={classes.rightContentContainer}>
            <Typography variant="h6" onClick={handleGoToHomePage}>
              Medium
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AuthorPage;
