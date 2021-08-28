import { Avatar, Box, Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SettingsIcon from '@material-ui/icons/Settings';
import { useAppDispatch } from 'app/hooks';
import { setInAuthorPage } from 'features/author/authorSlice';
import React from 'react';
import { Link } from 'react-router-dom';
import ArticleComponent from '../article/ArticleComponent';
import Loading from '../Loading';
import MenuTabs from './MenuTabs';

const HEIGHT = window.screen.height;

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 400,
  },
  media: {
    height: HEIGHT / 3,
    position: 'relative',
  },
  settingBtn: {
    position: 'absolute',
    right: '20px',
    bottom: '15px',
    backgroundColor: 'white',
    padding: '8px 10px',
    color: 'black',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    gap: '3px',
    '&:hover': {
      opacity: '0.8',
    },
  },
  profileImage: {
    position: 'relative',
    top: '-110px',
    justifyContent: 'center',
    width: theme.spacing(HEIGHT / 40),
    height: theme.spacing(HEIGHT / 40),
    border: '5px solid white',
    margin: 'auto',
  },
  profileInfoContainer: {
    position: 'relative',
    top: '-100px',
    margin: 'auto',
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 0,
  },
  userTag: {
    marginTop: 0,
  },
  contentContainer: {
    position: 'relative',
    top: '-90px',
  },
  articleListContainer: {
    marginTop: '30px',
  },
  articleList: {
    width: '100%',
  },
}));

interface ProfileComponentProps {
  author: AuthorType;
  articleList?: ArticleType[];
  isLoading?: boolean;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({ author, articleList, isLoading }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  let articleListElement;
  if (!articleList) return (articleListElement = null);
  if (!articleList.length) return (articleListElement = null);

  articleListElement =
    articleList?.length === 0 ? null : (
      <Box>
        {isLoading ? (
          <Loading />
        ) : (
          <Box className={classes.articleList}>
            {articleList?.map((article) => (
              <ArticleComponent key={article.slug} article={article} />
            ))}
          </Box>
        )}
      </Box>
    );

  // handle go to setting
  const handleGoToSetting = () => {
    dispatch(setInAuthorPage(false));
    localStorage.setItem('inAuthorPage', 'false');
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="https://st.quantrimang.com/photos/image/2018/09/20/anh-bia-facebook-mau-den-1.jpg"
      >
        <Link className={classes.settingBtn} to="/settings" onClick={handleGoToSetting}>
          <SettingsIcon />
          Edit Profile Setting
        </Link>
      </CardMedia>
      <Avatar src={author?.image} className={classes.profileImage} />
      <div className={classes.profileInfoContainer}>
        <Typography align={'center'} className={classes.userName} variant="h4" gutterBottom>
          {author?.username}
        </Typography>
        <Typography align={'center'} variant="subtitle2" gutterBottom className={classes.userTag}>
          {author?.following}
        </Typography>
        <Typography align={'center'} variant="subtitle2" gutterBottom className={classes.userTag}>
          {author?.bio}
        </Typography>
      </div>
      <CardContent className={classes.contentContainer}>
        <MenuTabs tab1="My articles" tab2="My favorite articles" />
        <Box className={classes.articleListContainer}>{articleListElement}</Box>
      </CardContent>
    </Card>
  );
};
export default ProfileComponent;
