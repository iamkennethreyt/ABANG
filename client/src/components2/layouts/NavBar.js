import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signout } from "../../actions/userActions";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.signout();
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    const authContent = (
      <React.Fragment>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {this.props.users.user.name}
          </a>
          <div
            className="dropdown-menu dropdown-primary"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <Link className="dropdown-item" to="/properties">
              Properties
            </Link>
            <Link className="dropdown-item" to="/settings/account">
              Account Settings
            </Link>
            <Link className="dropdown-item" to="/settings/password">
              Password Settings
            </Link>
            <a className="dropdown-item" href="/" onClick={this.onLogoutClick}>
              Sign Out
            </a>
          </div>
        </li>
      </React.Fragment>
    );
    const guestContent = (
      <React.Fragment>
        <li className="nav-item">
          <Link className="nav-link" to="/signin">
            Sign In
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup/lessor">
            Sign Up Lessor
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup/lodger">
            Sign Up Lodger
          </Link>
        </li>
      </React.Fragment>
    );
    console.log("this.props", this.props.location.pathname);
    return (
      <div>
        <div style={{ height: "60px" }} />

        <nav className="navbar navbar-expand-lg navbar-dark purple darken-4 fixed-top">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Abang
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#basicExampleNav"
              aria-controls="basicExampleNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="basicExampleNav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/rooms">
                    Room
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav">
                {this.props.users.isAuthenticated ? authContent : guestContent}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  signout: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  { signout }
)(withRouter(Navbar));
