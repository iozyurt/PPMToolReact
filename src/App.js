import Header from "./components/Header";
import { Redirect, Route, Switch } from "react-router";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Notfound from "./components/Notfound";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/not-found" component={Notfound} />
          <Redirect from="/" exact to="/dashboard" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
