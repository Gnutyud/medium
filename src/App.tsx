import '@fontsource/roboto';
import { Box, makeStyles } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import { Header, NotFound } from 'components/common';
import HomeLayout from 'components/layout/Home';
import AddArticle from 'features/article/page/AddArticle';
import { setNumberCurrentPage } from 'features/articles/articlesSlice';
import LoginPage from 'features/auth/pages/LoginPage';
import ProfilePage from 'features/profile/pages/ProfilePage';
import SettingPage from 'features/setting/pages/SettingPage';
import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    margin: '0 auto',
    fontFamily: 'Roboto, sans-serif',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));

function App() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  // initial page = 1
  useEffect(() => {
    dispatch(setNumberCurrentPage(1));
  }, [dispatch]);

  return (
    <>
      <Header />
      <Box className={classes.root}>
        <Switch>
          <Route path="/" component={HomeLayout} exact />
          <Route path="/auth" component={LoginPage} />
          <Route path="/home" component={HomeLayout} />
          <Route path="/article/create" component={AddArticle} />
          <Route path="/settings" component={SettingPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route component={NotFound} />
        </Switch>
      </Box>
    </>
  );
}

export default App;
