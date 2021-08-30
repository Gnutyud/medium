import { Box } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Loading from 'components/common/Loading';
import {
  getListArticle,
  selectCountArticles,
  selectListArticles,
  selectLoadingArticles,
  selectNumberArticlePerPage,
  selectNumberCurrentPage,
  selectTagByArticle,
  setNumberCurrentPage,
} from 'features/articles/articlesSlice';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Profile from '../components/Profile';
import { getProfile, selectIsLoading, selectProfile } from '../profileSlice';

const queryString = require('query-string');

const ProfilePage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  // select author name from url
  const { username } = useParams<{ username: string }>();

  // set initial value of current page
  useEffect(() => {
    dispatch(setNumberCurrentPage(1));
  }, [dispatch]);

  // select profile + loading state
  const profile = useAppSelector(selectProfile);
  const isLoadingProfile = useAppSelector(selectIsLoading);

  // select data from store
  const articleList = useAppSelector(selectListArticles);
  const isLoading = useAppSelector(selectLoadingArticles);
  const totalArticle = useAppSelector(selectCountArticles);

  // select data for filter by tags
  const tagByArticle = useAppSelector(selectTagByArticle);

  // select data for pagination from store
  const currentPage = useAppSelector(selectNumberCurrentPage);
  const articlePerPage = useAppSelector(selectNumberArticlePerPage);

  // get page from url param
  const { page } = queryString.parse(location.search);
  const offsetIndex = +page - 1 || currentPage - 1;

  // fetch list articles + pagination by offset + author
  useEffect(() => {
    const action = {
      type: getListArticle.type,
      payload: {
        offset: offsetIndex * articlePerPage,
        limit: articlePerPage,
        tag: tagByArticle,
        author: username,
      },
    };
    dispatch(action);
  }, [username, offsetIndex, tagByArticle, articlePerPage, dispatch]);

  // fetch profile by username
  useEffect(() => {
    const action = {
      type: getProfile.type,
      payload: { username },
    };
    dispatch(action);
  }, [dispatch, username]);

  // log
  // console.log('total articles ', totalArticle);
  // console.log('tag ', tagByArticle);
  // console.log('current page ', currentPage);
  // console.log('result per page ', articlePerPage);

  return (
    <Box>
      {isLoadingProfile ? (
        <Loading />
      ) : (
        <Box>
          <Profile
            author={profile}
            articleList={articleList}
            isLoading={isLoading}
            articleCount={totalArticle}
            tagByArticle={tagByArticle}
            currentPage={currentPage}
            articlePerPage={articlePerPage}
            username={username}
          />
        </Box>
      )}
    </Box>
  );
};

export default ProfilePage;
