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

  // select data for pagination from store
  const currentPage = useAppSelector(selectNumberCurrentPage);
  const articlePerPage = useAppSelector(selectNumberArticlePerPage);

  // select data for filter by tag
  const tagByArticle = useAppSelector(selectTagByArticle);
  console.log('tag ', tagByArticle, typeof tagByArticle);

  // get page from url param
  const { page } = queryString.parse(location.search);
  const currentPageFinal = +page - 1 || currentPage - 1;

  // get tag from url param
  const { tag } = queryString.parse(location.search);
  const tagFinal = tag || tagByArticle;

  console.log('tag final ', tagFinal);

  // fetch list articles + pagination by offset + filter by tag
  useEffect(() => {
    const action = {
      type: getListArticle.type,
      payload: {
        offset: currentPageFinal * articlePerPage,
        limit: articlePerPage,
        tag: tagFinal,
      },
    };
    dispatch(action);
  }, [currentPageFinal, articlePerPage, tagFinal, dispatch]);

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
