import { Box, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
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

  // get data for pagination
  const articleCount = useAppSelector(selectCountArticles);
  const articlePerPage = useAppSelector(selectNumberArticlePerPage);
  const currentPage = useAppSelector(selectNumberCurrentPage);

  // get total page
  const totalPage = Math.ceil(articleCount / articlePerPage);

  // get current page final
  const { page } = queryString.parse(location.search);
  const currentPageFinal = +page - 1 || currentPage - 1;

  // initial sync url param
  useEffect(() => {
    const queryParams = { page: 1 };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  }, [history, match.path]);

  // sync url param with state
  useEffect(() => {
    const urlParams = queryString.parse(location.search);
    const { page } = urlParams;

    dispatch(setNumberCurrentPage(page));
  }, [location.search, dispatch]);

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

  return (
    <Box className={classes.root}>
      <Pagination
        size="large"
        count={totalPage}
        page={currentPageFinal + 1}
        onChange={handleNavigate}
      />
    </Box>
  );
};

export default ArticlePagination;
