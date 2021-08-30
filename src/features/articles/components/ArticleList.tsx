import { useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Loading from 'components/common/Loading';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getListArticle,
  getListArticleByFeed,
  selectCountArticles,
  selectListArticles,
  selectLoadingArticles,
  selectNumberArticlePerPage,
  selectNumberCurrentPage,
  selectTagByArticle,
} from '../articlesSlice';
import ArticleItem from './ArticleItem';
import ArticleMenuTabs from './ArticleMenuTabs';
import ArticlePagination from './ArticlePagination';

const queryString = require('query-string');

const useStyles = makeStyles((theme) => ({
  articleList: {
    borderRight: '1px solid',
    borderRightColor: grey[400],
    [theme.breakpoints.down('md')]: {
      border: 'none',
    },
  },
  menuTab: {
    marginBottom: '30px',
  },
  newFeedEmpty: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}));

const ArticleList = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useAppDispatch();

  // state
  const [listArticleDisplay, setListArticleDisplay] = useState(0);

  const handleListArticleDisplay = (choose: number) => {
    setListArticleDisplay(choose);
  };

  // select data from store
  const articleList = useAppSelector(selectListArticles);
  const isLoading = useAppSelector(selectLoadingArticles);

  // select data for pagination from store
  const articleCount = useAppSelector(selectCountArticles);
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
      type: listArticleDisplay === 0 ? getListArticle.type : getListArticleByFeed.type,
      payload: {
        offset: offsetIndex * articlePerPage,
        limit: articlePerPage,
        tag: tagFinal,
      },
    };
    dispatch(action);
  }, [offsetIndex, articlePerPage, tagFinal, listArticleDisplay, dispatch]);

  return (
    <Box>
      {isLoading ? (
        <Loading />
      ) : (
        <Box>
          <Box className={classes.menuTab}>
            <ArticleMenuTabs handleDisplay={handleListArticleDisplay} />
          </Box>

          {articleList.length > 0 ? (
            <Box className={classes.articleList}>
              {articleList.map((article) => (
                <ArticleItem key={article.slug} article={article} />
              ))}
            </Box>
          ) : (
            <Box className={classes.newFeedEmpty}>You haven't follow any author..</Box>
          )}

          <Box>
            {articleCount > 0 && (
              <ArticlePagination
                articleCount={articleCount}
                articlePerPage={articlePerPage}
                tagByArticle={tagByArticle}
                currentPage={currentPage}
              />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ArticleList;
