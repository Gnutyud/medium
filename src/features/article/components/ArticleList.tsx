import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getListArticle, selectListArticles, selectLoadingArticles } from '../ArticleSlice';
import { Box } from '@material-ui/core';
import Loading from 'components/common/Loading';
import ArticleItem from './ArticleItem';

const ArticleList = () => {
  const dispatch = useAppDispatch();
  const articleList = useAppSelector(selectListArticles);
  const isLoading = useAppSelector(selectLoadingArticles);

  console.log(articleList, isLoading);

  useEffect(() => {
    const action = {
      type: getListArticle.type,
      payload: {
        offset: 0,
        limit: 5,
      },
    };
    dispatch(action);
  }, [dispatch]);

  return (
    <Box>
      {isLoading ? (
        <Loading />
      ) : (
        articleList.map((article) => <ArticleItem key={article.slug} article={article} />)
      )}
    </Box>
  );
};

export default ArticleList;
