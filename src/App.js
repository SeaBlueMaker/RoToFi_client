import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Header from "./components/AppHeader/Header";
import MainPage from "./components/MainPage.js/MainPage";
import NewProjectPage from "./components/NewProjectPage/NewProjectPage";
import ProjectListPage from "./components/MainPage.js/ProjectListPage";
import ProjectPage from "./components/ProjectPage.js/ProjectPage";

import "./App.scss";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/projects" component={ProjectListPage} />
        <Route path="/projects/new" component={NewProjectPage} />
        <Route path="/projects/:id" component={ProjectPage} />
      </Switch>
    </Router>
  );
}

export default App;
