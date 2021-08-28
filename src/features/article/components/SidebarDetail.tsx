import { Box, Divider, IconButton, makeStyles, Typography } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import React from 'react';

const useStyle = makeStyles(() => ({
  position: {
    position: 'fixed',
    width: '15%',
    margin: '20px',
  },
  name: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  bio: {
    fontSize: '15px',
  },
}));

function SidebarDetail(props: any) {
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

  return (
    <Box className={classes.position}>
      <Typography variant="h6" className={classes.name}>
        Lê Thành Đạt
      </Typography>
      <Typography className={classes.bio}>
        Writer, videographer, journalist with opinions. Come, let us walk into the apocalypse
        together. She/Hers. I’m on Twitter: @LauraJedeed
      </Typography>
      <Divider light />
      <Box style={{ marginTop: '20px' }}>
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
      </Box>
    </Box>
  );
}

export default SidebarDetail;
