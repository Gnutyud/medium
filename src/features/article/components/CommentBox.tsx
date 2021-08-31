import {
  Avatar,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useState } from 'react';
import { showComment, toggleComment } from '../articleSlice';
import { CommentItem } from './CommentItem';
const useStyle = makeStyles(() => ({
  container: {
    position: 'fixed',
    top: '0',
    right: '0px',
    width: '400px',
    minHeight: '100vh',
    maxHeight: '100%',
    backgroundColor: 'white',
    overflowY: 'scroll',
    boxShadow: 'inset 1px 0px 0px 0px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.5s ease-in-out',
  },
  inputBox: {
    border: '1px solid #e8dfec',
    borderRadius: '10px',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 8px 0 rgba(0, 0, 0, 0.19)',
    overflow: 'hidden',
    margin: '15px auto 0px',
    display: 'flex',
    flexDirection: 'column',
    transition: 'height 0.5s ease-in-out',
    padding: '10px 20px',
    backgroundColor: 'white',
  },
  btnGroup: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  content: {
    padding: '20px',
  },
  closeBtn: {
    '&:hover': {
      opacity: '1',
      backgroundColor: '#e8dfec',
      borderRadius: '50%',
    },
    opacity: '0.7',
    cursor: 'pointer',
    padding: '5px',
    fontSize: '40px',
  },
}));

export const CommentBox = () => {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const isShowComment = useAppSelector(showComment);
  const classes = useStyle();
  const toggle = () => {
    dispatch(toggleComment());
  };
  return (
    <div className={classes.container} style={{ right: !isShowComment ? '-400px' : '0px' }}>
      <div className={classes.content}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Responses (7)</Typography>
          <CloseIcon onClick={toggle} className={classes.closeBtn} />
        </div>
        <form className={classes.inputBox}>
          {show && (
            <ListItem style={{ padding: '0', marginBottom: '5px' }}>
              <ListItemAvatar>
                <Avatar>T</Avatar>
              </ListItemAvatar>
              <ListItemText primary="Tungnd24" />
            </ListItem>
          )}
          <TextField
            placeholder="What are your thoughts?"
            multiline
            fullWidth
            InputProps={{ disableUnderline: true }}
            onClick={() => setShow(true)}
          />
          {show && (
            <div className={classes.btnGroup}>
              <Button onClick={() => setShow(false)} style={{ textTransform: 'none' }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ borderRadius: '25px', marginLeft: '5px', textTransform: 'none' }}
              >
                Respond
              </Button>
            </div>
          )}
        </form>
      </div>
      <div className={classes.content}>
        <Typography>Most Relevant</Typography>
      </div>
      <Divider />
      <div className={classes.content}>
        <CommentItem />
        <CommentItem />
        <CommentItem />
      </div>
    </div>
  );
};
