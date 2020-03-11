import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//Import all the screens
import Login from './pages/Login'
import TermConditions from './pages/TermConditions'
import UserInformation from './pages/UserInformation'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          
          <Route exact path="/termConditions">
            <TermConditions />
          </Route>

          <Route exact path="/userinformation">
            <UserInformation />
          </Route>

          <Route exact path="/dashboard">
            <Dashboard />
          </Route>

          <Route path="*">
            <Login />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
