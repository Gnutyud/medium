import '@fontsource/roboto';
import { Box, makeStyles } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { Header, NotFound } from 'components/common';
import HomeLayout from 'components/layout/Home';
import LoginPage from 'features/auth/pages/LoginPage';
import { selectInAuthorPage } from 'features/author/authorSlice';
import AuthorPage from 'features/author/pages/AuthorPage';
import ProfilePage from 'features/profile/pages/ProfilePage';
import SettingPage from 'features/setting/pages/SettingPage';
import { Route, Switch } from 'react-router';

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
  const inAuthorPage = useAppSelector(selectInAuthorPage);
  return (
    <>
      <Box className={classes.root}>
        {!inAuthorPage && <Header />}
        <Switch>
          <Route path="/" component={HomeLayout} exact />
          <Route path="/author/:authorname" component={AuthorPage} exact />
          <Route path="/auth" component={LoginPage} />
          <Route path="/home" component={HomeLayout} />
          <Route path="/settings" component={SettingPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route component={NotFound} />
        </Switch>
      </Box>
    </>
  );
}

export default App;
