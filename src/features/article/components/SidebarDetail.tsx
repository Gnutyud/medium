import { Box, Divider, IconButton, makeStyles, Typography } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useAppDispatch } from 'app/hooks';
import { favoriteRequest } from 'features/articles/articlesSlice';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { toggleComment } from '../articleSlice';
import ButtonSplit from './ButtonSplit';

const useStyle = makeStyles(() => ({
  position: {
    position: 'fixed',
    width: '17%',
    margin: '20px',
  },
  name: {
    textDecoration: 'none',
    fontSize: '25px',
    fontWeight: 'bold',
    color: 'black',
    '&:hover': {
      transition: 'all 0.5s',
      fontSize: '30px',
      cursor: 'pointer',
    },
  },
  bio: {
    marginTop: '25px',
    fontSize: '15px',
  },
}));

function SidebarDetail({ article }: { article: ArticleType }) {
  const dispatch = useAppDispatch();
  const classes = useStyle();
  const local: any = localStorage.getItem('user');
  const curUser = JSON.parse(local);
  // handle favorite
  const handleFavorite = () => {
    let favoritePayload: FavoritePayloadProps = {
      slug: article.slug,
      favorited: article.favorited,
    };
    dispatch(favoriteRequest(favoritePayload));
  };
  // Show comment
  const onShowComment = () => {
    dispatch(toggleComment());
  };
  if (!article) {
    return <h1>Loading...</h1>;
  }
  return (
    <Box className={classes.position}>
      <NavLink className={classes.name} to={`/profile/${article?.author?.username}`}>
        {article?.author?.username}
      </NavLink>
      <Typography className={classes.bio}>{article?.author?.bio}</Typography>
      <Divider light />
      <Box style={{ marginTop: '20px', display: 'flex', lineHeight: '48px' }}>
        <Box>
          <IconButton aria-label="like" color="default" onClick={handleFavorite}>
            {article?.favorited ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
          </IconButton>
          <span>{article?.favoritesCount}</span>
        </Box>
        <Box>
          <React.Fragment key="right">
            <IconButton aria-label="comment" color="default" onClick={onShowComment}>
              <ChatBubbleOutlineIcon />
            </IconButton>
          </React.Fragment>
          <span>100</span>
        </Box>
        {curUser?.username === article?.author?.username && (
          <ButtonSplit slug={article.slug} username={article?.author?.username} />
        )}
      </Box>
    </Box>
  );
}

export default SidebarDetail;
