import React, { Component, Fragment } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser } from "./actions/userActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

//COMPONENTS
import SignIn from "./components/Auth/SignIn";
import Dashboard from "./components/Dashboard/Dashboard";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Route exact path="/signin" component={SignIn} />
            <div>
              <div className="container">
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                </Switch>
              </div>
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
