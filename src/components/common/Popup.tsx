import { Avatar, Box, makeStyles } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { followProfile, selectProfile, unFollowProfile } from 'features/profile/profileSlice';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { upperFirstLetter } from 'share/methods/upperFirst';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';

interface ArticleProps {
  article: ArticleType;
}

const useStyle = makeStyles((theme) => ({
  avatar: {
    lineHeight: '40px',
    marginLeft: '10px',
    textDecoration: 'none',
  },
  followBtn: {
    cursor: 'pointer',
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
}));

function Popup({ article }: ArticleProps) {
  const { slug, author, title, updatedAt, description, favorited, favoritesCount, tagList } =
    article;
  const classes = useStyle();
  const dispatch = useAppDispatch();
  // auth
  const local: any = localStorage.getItem('user');
  const curUser = JSON.parse(local);
  const userFromStore = useAppSelector(selectProfile);
  const followingState = userFromStore.following;

  // handle follow action
  const handleFollow = () => {
    if (curUser) {
      if (!followingState) {
        dispatch({
          type: followProfile.type,
          payload: { username: author?.username },
        });
      } else {
        dispatch({
          type: unFollowProfile.type,
          payload: { username: author?.username },
        });
      }
    }
  };
  return (
    <>
      <Box style={{ display: 'flex' }}>
        <Avatar alt={author?.username} src={article?.author?.image} />
        <NavLink className={classes.avatar} to={`/profile/${article?.author?.username}`}>
          {upperFirstLetter(author?.username)}
        </NavLink>
        <Box className={classes.followBtn} onClick={handleFollow}>
          {followingState ? <CheckIcon /> : <AddIcon />}
          Following
        </Box>
      </Box>
    </>
  );
}

export default Popup;
