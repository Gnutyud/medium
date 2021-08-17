import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Divider,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import { useDispatch } from "react-redux";
import { authActions } from "../../app/reducers/authSlice";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  menuItem: {
    "&:hover, &:hover $menuIcon": {
      color: "blue",
    },
  },
  menuIcon: {
    marginRight: theme.spacing(1),
  },
}));

export const Account = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let currentUser;
  const jsonUser = localStorage.getItem("user");
  if (jsonUser) {
    currentUser = JSON.parse(jsonUser);
  }

  const classes = useStyles();
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
  const handleLogout = () => {
    console.log("logout");
    history.replace("/");
    dispatch(authActions.logoutHandler());
    setOpen(false);
  };
  function handleListKeyDown(event: any) {
    if (event.key === "Tab") {
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
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}>
        <Avatar>{currentUser.username.slice(0, 1)}</Avatar>
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        placement="bottom"
        disablePortal>
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
              autoFocusItem={open}
              id="menu-list-grow"
              onKeyDown={handleListKeyDown}>
              <MenuItem onClick={handleClose}>
                <ListItemAvatar>
                  <Avatar>
                    {currentUser.username.slice(0, 1).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={currentUser.username}
                  secondary={currentUser.email}
                />
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose} className={classes.menuItem}>
                <PersonIcon color="action" className={classes.menuIcon} />
                Profile
              </MenuItem>
              <MenuItem onClick={handleClose} className={classes.menuItem}>
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
