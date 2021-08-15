import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import NewPost from "./features/articles/components/NewPost";
function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Route path="/article/create">
          <NewPost />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
