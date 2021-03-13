import Header from "./components/Header";
import { Redirect, Route, Switch } from "react-router";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Notfound from "./components/Notfound";
import AddProject from "./components/AddProject";
import "./App.css";
import Landing from "./components/Landing";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/register" component={Register} />
          <Route path="/addProject" component={AddProject} />
          <Route path="/not-found" component={Notfound} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
