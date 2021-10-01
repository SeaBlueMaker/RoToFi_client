import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import UserMenu from "./components/AppHeader/UserMenu";
import MainPage from "./components/MainPage.js/MainPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";

function App() {
  return (
    <Router>
      <UserMenu />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/users/register" component={RegisterPage} />
      </Switch>
    </Router>
  );
}

export default App;
