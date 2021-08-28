import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  ClickAwayListener,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Divider,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import { authActions } from '../../../features/auth/authSlice';
import { useHistory } from 'react-router-dom';
import { userSelector } from '../../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getUser, selectUser } from 'features/setting/settingSlice';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  menuItem: {
    '&:hover, &:hover $menuIcon': {
      color: 'blue',
    },
    padding: '10px 30px',
  },
  menuIcon: {
    marginRight: theme.spacing(1),
  },
}));

export const Account = () => {
  const currentUser = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  const classes = useStyles();
  const history = useHistory();

  console.log(currentUser);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<null | any>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const handleSetting = (event: any) => {
    history.push('/settings');
    setOpen(false);
  };
  const handleLogout = () => {
    console.log('logout');
    history.replace('/');
    dispatch(authActions.logoutHandler());
    setOpen(false);
  };
  const handleProfile = () => {
    history.replace('/profile/' + currentUser?.username);
    setOpen(false);
  };
  function handleListKeyDown(event: any) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current && !open) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Avatar src={currentUser?.image && currentUser.image} />
      </Button>
      <Popper
        style={{
          zIndex: 100,
          maxWidth: '300px',
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        placement="bottom"
        disablePortal
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
              <MenuItem onClick={handleClose} className={classes.menuItem}>
                <ListItemAvatar>
                  <Avatar src={currentUser?.image && currentUser.image} />
                </ListItemAvatar>
                <ListItemText
                  style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                  primary={currentUser?.username}
                  secondary={'@' + currentUser?.email.substring(0, currentUser?.email.indexOf('@'))}
                />
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleProfile} className={classes.menuItem}>
                <PersonIcon color="action" className={classes.menuIcon} />
                Profile
              </MenuItem>
              <MenuItem onClick={handleSetting} className={classes.menuItem}>
                <SettingsIcon color="action" className={classes.menuIcon} />
                Setting
              </MenuItem>
              <MenuItem onClick={handleLogout} className={classes.menuItem}>
                <ExitToAppIcon color="action" className={classes.menuIcon} />
                Logout
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </div>
  );
};
