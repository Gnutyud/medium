import '@fontsource/roboto';
import { Box, makeStyles } from '@material-ui/core';
import { Header, NotFound, PrivateRoute } from 'components/common';
import AdminLayout from 'components/layout/Admin';
import HomeLayout from 'components/layout/Home';
import LoginPage from 'features/auth/pages/LoginPage';
import ProfilePage from 'features/profile/pages/ProfilePage';
import SettingPage from 'features/setting/pages/SettingPage';
import { Redirect, Route, Switch } from 'react-router';

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
        <PrivateRoute path="/admin" component={AdminLayout} />
        <Route path="/login" component={LoginPage} />
        <Route path="/home" component={HomeLayout} />
        <Route path="/setting" component={SettingPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route component={NotFound} />
      </Switch>
    </Box>
  );
}

export default App;
