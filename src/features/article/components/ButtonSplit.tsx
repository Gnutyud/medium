import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { IconButton, MenuItem, Portal } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from 'app/hooks';
import { deleteArticle } from '../articleSlice';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

function ButtonSplit({ slug, username }: { slug: string; username: string }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch({
      type: deleteArticle.type,
      payload: slug,
    });
    history.push(`/profile/${username}`);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.root}>
        <IconButton
          style={{ margin: '12px' }}
          color="primary"
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </IconButton>
        {open && (
          <>
            <MenuItem>update</MenuItem>
            <MenuItem onClick={handleDelete}>delete</MenuItem>
          </>
        )}
      </div>
    </ClickAwayListener>
  );
}

export default ButtonSplit;
