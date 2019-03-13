import React, { Component, Fragment } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser } from "./actions/userActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./Components/common/PrivateRoute";
import Header from "./Components/layout/Header";
import Footer from "./Components/layout/Footer";

// //COMPONENTS
import Dashboard from "./Components/Dashboard/Dashboard";
import SignIn from "./Components/Auth/SignIn";
import SignUp from "./Components/Auth/SignUp";
import Properties from "./Components/Properties/Properties";
import Property from "./Components/Properties/Property";
import About from "./Components/Dashboard/About";
import Rooms from "./Components/Rooms/Rooms";

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
            <Header />
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/about" component={About} />
            <Route exact path="/rooms" component={Rooms} />
            <Route exact path={`/property/:id`} component={Property} />
            <div>
              <Switch>
                <PrivateRoute exact path="/properties" component={Properties} />
              </Switch>
            </div>
            <Footer />
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
