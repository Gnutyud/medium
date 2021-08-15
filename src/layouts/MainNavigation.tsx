import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Account } from "./Account";
import CreateIcon from "@material-ui/icons/Create";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const MainNavigation = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/">Logo</NavLink>
          </Typography>
          {!isLoggedIn && (
            <NavLink to="/auth">
              <Button color="inherit">Sign In</Button>
            </NavLink>
          )}
          {isLoggedIn && (
            <React.Fragment>
              <NavLink to="/post">
                <Button color="inherit">
                  <CreateIcon style={{ marginRight: "5px" }} />
                  New Post
                </Button>
              </NavLink>
              <Account />
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
export default MainNavigation;
