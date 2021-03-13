import Header from "./components/Header";
import "./App.css";
import { Redirect, Route, Switch } from "react-router";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Redirect from="/" exact to="/dashboard" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
