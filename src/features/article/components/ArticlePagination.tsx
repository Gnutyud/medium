import { useEffect } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import {
  selectCountArticles,
  selectNumberArticlePerPage,
  selectNumberCurrentPage,
  setNumberCurrentPage,
} from '../../article/articleSlice';

const useStyles = makeStyles({
  root: {
    marginTop: '40px',
  },
});

const queryString = require('query-string');

const ArticlePagination = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const dispatch = useAppDispatch();
  const articleCount = useAppSelector(selectCountArticles);
  const articlePerPage = useAppSelector(selectNumberArticlePerPage);
  let currentPage = useAppSelector(selectNumberCurrentPage);

  // get current page
  const urlParams = queryString.parse(location.search);
  currentPage = urlParams?.page - 1 || currentPage - 1;

  // get total page
  const totalPage = Math.ceil(articleCount / articlePerPage);

  // navigate to page event
  const handleNavigate = (event: any, pageNumber: number) => {
    dispatch(setNumberCurrentPage(pageNumber));

    // sync url param
    const queryParams = { page: pageNumber };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  // sync url param
  useEffect(() => {
    const urlParams = queryString.parse(location.search);
    const { page } = urlParams;

    dispatch(setNumberCurrentPage(page - 1));
  }, [location.search, dispatch]);

  return (
    <Box className={classes.root}>
      <Pagination count={totalPage} page={+currentPage + 1} onChange={handleNavigate} />
    </Box>
  );
};

export default ArticlePagination;
