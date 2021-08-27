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
  selectTagByArticle,
} from '../articlesSlice';
import ArticleItem from './ArticleItem';

const queryString = require('query-string');

const useStyles = makeStyles((theme) => ({
  articleList: {
    borderRight: '1px solid',
    borderRightColor: grey[400],
    [theme.breakpoints.down('md')]: {
      border: 'none',
    },
  },
}));

const ArticleList = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useAppDispatch();

  // select data from store
  const articleList = useAppSelector(selectListArticles);
  const isLoading = useAppSelector(selectLoadingArticles);

  // select data for pagination from store
  const currentPage = useAppSelector(selectNumberCurrentPage);
  const articlePerPage = useAppSelector(selectNumberArticlePerPage);

  // select data for filter by tags
  const tagByArticle = useAppSelector(selectTagByArticle);

  // get page from url param
  const { page } = queryString.parse(location.search);
  const offsetIndex = +page - 1 || currentPage - 1;

  // get tags from url param
  const { tag } = queryString.parse(location.search);
  const tagFinal = tag || tagByArticle;

  // fetch list articles + pagination by offset + filter by tags
  useEffect(() => {
    const action = {
      type: getListArticle.type,
      payload: {
        offset: offsetIndex * articlePerPage,
        limit: articlePerPage,
        tag: tagFinal,
      },
    };
    dispatch(action);
  }, [offsetIndex, articlePerPage, tagFinal, dispatch]);

  // console.log('article list ', articleList);

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
