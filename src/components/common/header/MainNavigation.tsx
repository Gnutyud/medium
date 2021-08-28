import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { useAppDispatch } from 'app/hooks';
import { setNumberCurrentPage, setTag } from 'features/articles/articlesSlice';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import type { RootState } from '../../../app/store';
import { Account } from './Account';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    flexGrow: 1,
    '& a': { color: 'black', textDecoration: 'none' },
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
  const dispatch = useAppDispatch();

  const handleClickNavLink = () => {
    dispatch(setNumberCurrentPage(1));
    dispatch(setTag(null));
  };

  return (
    <AppBar position="static" style={{ padding: '0 50px' }} className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <NavLink to="/" onClick={handleClickNavLink}>
            Logo
          </NavLink>
        </Typography>
        {!isLoggedIn && (
          <NavLink to="/auth">
            <Button color="inherit">Sign In</Button>
          </NavLink>
        )}
        {isLoggedIn && (
          <>
            <NavLink to="/article/create">
              <Button startIcon={<PostAddIcon />} color="inherit">
                New Post
              </Button>
            </NavLink>
            <Account />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default MainNavigation;
