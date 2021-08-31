import { Box, Divider, IconButton, makeStyles, Typography } from '@material-ui/core';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import React from 'react';
import { NavLink } from 'react-router-dom';
import ButtonSplit from './ButtonSplit';
import { useAppDispatch } from 'app/hooks';
import { favoriteRequest } from 'features/articles/articlesSlice';
import { upperFirstLetter } from 'share/methods/upperFirst';

const useStyle = makeStyles((theme) => ({
  position: {
    position: 'fixed',
    width: '17%',
    margin: '20px',
    [theme.breakpoints.down('sm')]: {
      position: 'static',
      width: '100%',
    },
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
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  bio: {
    marginTop: '25px',
    fontSize: '15px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

function SidebarDetail({ article }: { article: ArticleType }) {
  const dispatch = useAppDispatch();
  const classes = useStyle();
  const [state, setState] = React.useState({
    right: false,
  });
  const toggleDrawer = (open: boolean) => (event: any) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ right: open });
  };
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
  if (!article) {
    return <h1>Loading...</h1>;
  }
  return (
    <Box className={classes.position}>
      <NavLink className={classes.name} to={`/profile/${article?.author?.username}`}>
        {upperFirstLetter(article?.author?.username)}
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
            <IconButton aria-label="comment" color="default" onClick={toggleDrawer(true)}>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <SwipeableDrawer
              anchor="right"
              open={state['right']}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            >
              <Box style={{ width: '450px' }}>
                <h1>hello</h1>
              </Box>
            </SwipeableDrawer>
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
