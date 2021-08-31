import {
  Avatar,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import React from 'react';
const useStyle = makeStyles(() => ({
  footer: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  container: {
    marginTop: '10px',
  },
}));
export const CommentItem = () => {
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <ListItem style={{ padding: '0', marginBottom: '5px' }}>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Sontungmtp" secondary="10 hours ago" />
      </ListItem>
      <p>
        Most people don't do this retrospective. I'm impressed by your attitude of highlighting your
        mistakes and how you would like to avoid it in the future. Kudos to you! Hope you enjoy your
        new role as a manager truly. Looking forward to hear how that experience turns out for your
        sub-ordinates!
      </p>
      <div className={classes.footer}>
        <Button style={{ textTransform: 'none' }}>Reply</Button>
      </div>
      <Divider style={{ marginTop: '10px' }} />
    </div>
  );
};
