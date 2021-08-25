import '@fontsource/roboto';
import { Redirect, Route, Switch } from 'react-router';
import { Box, makeStyles } from '@material-ui/core';
import AuthPage from 'features/auth';
import HomePage from 'features/home';
import ArticlePage from 'features/article';
import SettingPage from 'features/setting';
import ProfilePage from 'features/profile';
import NotFound from 'components/NotFound';
import Header from 'components/Header';

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
  return (
    <Box className={classes.root}>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" component={HomePage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/article" component={ArticlePage} />
        <Route path="/setting" component={SettingPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route component={NotFound} />
      </Switch>
    </Box>
  );
}

export default App;
