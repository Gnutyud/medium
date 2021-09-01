import { Avatar, Box, Button, Divider, makeStyles } from '@material-ui/core';
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
    fontSize: theme.spacing(3),
  },
  followBtn: {
    '&:hover': {
      opacity: '0.8',
    },
    fontSize: theme.spacing(1.5),
  },
  followContent: {
    alignSelf: 'center',
    fontSize: theme.spacing(1.5),
    // color: '#a9a9a1',
  },
  containerAvatar: {
    display: 'flex',
    marginBottom: theme.spacing(1),
  },
  containerFollow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
}));

function Popup({ article }: ArticleProps) {
  const { author } = article;
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
      <Box>
        <Box className={classes.containerAvatar}>
          <Avatar alt={author?.username} src={article?.author?.image} />
          <NavLink className={classes.avatar} to={`/profile/${article?.author?.username}`}>
            {upperFirstLetter(author?.username)}
          </NavLink>
        </Box>
        <Divider color="black" />
        <Box className={classes.containerFollow}>
          {/* <Box className={classes.followContent}>10 Articles</Box> */}
          <Button
            variant="contained"
            color="primary"
            className={classes.followBtn}
            onClick={handleFollow}
          >
            {followingState ? <CheckIcon /> : <AddIcon />}
            Following
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Popup;
