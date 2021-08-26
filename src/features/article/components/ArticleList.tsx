import { Box, makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Loading from 'components/common/Loading';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getListArticle,
  selectListArticles,
  selectLoadingArticles,
  selectNumberArticlePerPage,
  selectNumberCurrentPage,
} from '../articleSlice';
import ArticleItem from './ArticleItem';

const queryString = require('query-string');

const useStyles = makeStyles({
  articleList: {
    borderRight: '1px solid',
    borderRightColor: grey[400],
  },
});

const ArticleList = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useAppDispatch();

  // select data from store
  const articleList = useAppSelector(selectListArticles);
  const isLoading = useAppSelector(selectLoadingArticles);
  const currentPage = useAppSelector(selectNumberCurrentPage);
  const articlePerPage = useAppSelector(selectNumberArticlePerPage);

  // get current page final
  const { page } = queryString.parse(location.search);
  const currentPageFinal = +page - 1 || currentPage - 1;

  // fetch list articles + pagination by offset
  useEffect(() => {
    const action = {
      type: getListArticle.type,
      payload: {
        offset: currentPageFinal * articlePerPage,
        limit: articlePerPage,
      },
    };
    dispatch(action);
  }, [currentPageFinal, articlePerPage, dispatch]);

  return (
    <Box>
      {isLoading ? (
        <Loading />
      ) : (
        <Box className={classes.articleList}>
          {articleList.map((article) => (
            <ArticleItem key={article.slug} article={article} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ArticleList;
