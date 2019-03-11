import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signout } from "../../actions/userActions";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const Header = props => {
  const { classes, users, history, signout } = props;
  console.log(props);
  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            ABANG
          </Typography>
          <Button
            color="inherit"
            onClick={() =>
              users.isAuthenticated ? signout() : history.push("/signin")
            }
          >
            {users.isAuthenticated ? users.user.name + "| logout" : "Log in"}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  signout: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});
export default withStyles(styles)(
  connect(
    mapStateToProps,
    { signout }
  )(withRouter(Header))
);
