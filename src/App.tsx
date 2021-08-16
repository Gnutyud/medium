import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./common/Header/Layout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import AddArticle from "./pages/AddArticle";
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
          <AddArticle />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
