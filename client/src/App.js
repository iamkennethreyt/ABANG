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
import Lodger from "./components/Auth/SignUp/Lodger";
import Lessor from "./components/Auth/SignUp/Lessor";
import Navbar from "./components/layouts/NavBar";
import Footer from "./components/layouts/Footer";
import Account from "./components/settings/Account";
import Properties from "./components/properties/Properties";
import Password from "./components/settings/Password";
import Property from "./components/properties/Property";
import Rooms from "./components/rooms/Rooms";

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
            <Navbar />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup/lodger" component={Lodger} />
            <Route exact path="/signup/lessor" component={Lessor} />
            <div>
              <div className="">
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                </Switch>

                <Switch>
                  <PrivateRoute
                    exact
                    path="/settings/account"
                    component={Account}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/settings/password"
                    component={Password}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/properties"
                    component={Properties}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/rooms" component={Rooms} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path={`/property/:id`}
                    component={Property}
                  />
                </Switch>
              </div>
            </div>
            <Footer />
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
