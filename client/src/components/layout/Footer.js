import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Properties from "@material-ui/icons/AddLocation";
import Home from "@material-ui/icons/Home";
import Map from "@material-ui/icons/Map";
import Info from "@material-ui/icons/Info";
import { connect } from "react-redux";

const styles = {
  root: {
    flexGrow: 1,
    maxWidth: 500,
    margin: 10
  }
};

class Footer extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper
        square
        style={{ bottom: 10, position: "fixed", width: "100%", margin: "auto" }}
      >
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab
            icon={<Map />}
            label="MAP"
            onClick={() => this.props.history.push("/")}
          />
          {this.props.users.isAuthenticated ? (
            <Tab
              icon={<Properties />}
              label="PROPERTIES"
              onClick={() => this.props.history.push("/properties")}
            />
          ) : (
            <Tab
              icon={<Home />}
              label="ROOMS"
              onClick={() => this.props.history.push("/rooms")}
            />
          )}

          <Tab
            icon={<Info />}
            label="ABOUT US"
            onClick={() => this.props.history.push("/about")}
          />
        </Tabs>
      </Paper>
    );
  }
}

Footer.propTypes = {
  users: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  users: state.users
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(withStyles(styles)(withRouter(Footer))));
