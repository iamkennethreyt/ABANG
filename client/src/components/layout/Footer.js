import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Properties from "@material-ui/icons/AddLocation";
import Map from "@material-ui/icons/Map";
import Info from "@material-ui/icons/Info";

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
      <Paper square className={classes.root}>
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
          <Tab
            icon={<Properties />}
            label="PROPERTIES"
            onClick={() => this.props.history.push("/properties")}
          />
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(Footer));
