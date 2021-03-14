import Header from "./components/Header";
import { Redirect, Route, Switch } from "react-router";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Notfound from "./components/Notfound";
import ProjectForm from "./components/ProjectForm";
import Landing from "./components/Landing";
import "./App.css";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="container">
          <Header />
          <Switch>
            <Route path="/projects/:id" component={ProjectForm} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/register" component={Register} />
            <Route path="/not-found" component={Notfound} />
            <Route path="/" exact component={Landing} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    </Provider>
  );
}

export default App;
