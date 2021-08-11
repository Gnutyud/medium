import { Route, Switch } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/auth">
          <AuthPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
