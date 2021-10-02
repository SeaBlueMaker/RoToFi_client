import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import UserMenu from "./components/AppHeader/UserMenu";
import MainPage from "./components/MainPage.js/MainPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import NewProjectPage from "./components/NewProjectPage/NewProjectPage";

function App() {
  return (
    <Router>
      <UserMenu />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/users/register" component={RegisterPage} />
        <Route path="/projects/new" component={NewProjectPage} />
      </Switch>
    </Router>
  );
}

export default App;
