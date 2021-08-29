import { Box, Divider, IconButton, makeStyles, Typography } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import SplitButton from './SplitButton';

const useStyle = makeStyles(() => ({
  position: {
    position: 'fixed',
    width: '15%',
    margin: '20px',
  },
  name: {
    fontSize: '25px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: 'black',
  },
  bio: {
    fontSize: '15px',
  },
}));

function SidebarDetail({ article }: { article: ArticleType }) {
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

  return (
    <Box className={classes.position}>
      <NavLink
        className={classes.name}
        to={`/profile/${article?.author?.username}`}
        // onClick={() => {
        //   history.push(`/profile/${article?.author?.username}`);
        // }}
      >
        {article?.author?.username}
      </NavLink>
      <Typography className={classes.bio}>{article?.author?.bio}</Typography>
      <Divider light />
      <Box style={{ marginTop: '20px', display: 'flex', lineHeight: '48px' }}>
        <IconButton aria-label="like" color="default">
          <FavoriteBorderIcon />
        </IconButton>
        <span>100</span>
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
        {curUser?.username === article?.author?.username ? <SplitButton /> : ''}
      </Box>
    </Box>
  );
}

export default SidebarDetail;
