import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { getOwnProperties, addProperty } from "../../actions/propertyActions";
import moment from "moment";

const styles = theme => ({
  fab: {
    position: "fixed",
    bottom: 90,
    right: theme.spacing.unit * 2
  },
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

class Properties extends Component {
  state = {
    name: "",
    type: "",
    completeaddress: "",
    contactnumber: "",
    lat: "10.3018",
    long: "123.8919",
    displayInputForm: false,
    errors: {}
  };
  componentDidMount() {
    this.props.getOwnProperties();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      name: this.state.name,
      type: this.state.type,
      completeaddress: this.state.completeaddress,
      contactnumber: this.state.contactnumber,
      lat: this.state.lat,
      long: this.state.long
    };

    this.props.addProperty(userData, this.onSuccess);
  };

  onSuccess = () => {
    this.setState({
      displayInputForm: false,
      long: "",
      lat: "",
      name: "",
      completeaddress: "",
      type: "",
      errors: {}
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    console.log(this.props.properties.properties);
    const { classes } = this.props;
    return (
      <div>
        <div>
          {this.state.displayInputForm ? (
            <form
              style={{
                margin: "auto",
                width: "90%",
                border: "1px #ccc solid",
                padding: ".7rem"
              }}
              onSubmit={this.onSubmit}
            >
              <TextFieldGroup
                placeholder="Name of the Property"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                error={this.state.errors.name}
              />
              <TextFieldGroup
                placeholder="Complete Address"
                name="completeaddress"
                value={this.state.completeaddress}
                onChange={this.onChange}
                error={this.state.errors.completeaddress}
              />
              <TextFieldGroup
                placeholder="Phone Number"
                name="contactnumber"
                value={this.state.contactnumber}
                onChange={this.onChange}
                error={this.state.errors.contactnumber}
              />
              <TextFieldGroup
                placeholder="Type of Property, eg. Apartment, Condo"
                name="type"
                value={this.state.type}
                onChange={this.onChange}
                error={this.state.errors.type}
              />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <TextFieldGroup
                  placeholder="Longitude Coordinates"
                  name="long"
                  value={this.state.long}
                  onChange={this.onChange}
                  error={this.state.errors.long}
                />
                <TextFieldGroup
                  placeholder="Latitude Coordinates"
                  name="lat"
                  value={this.state.lat}
                  onChange={this.onChange}
                  error={this.state.errors.lat}
                />
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Submit
              </Button>
            </form>
          ) : null}
        </div>
        {this.props.properties.properties.map((prop, key) => {
          return (
            <Card className={classes.card} key={key}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="secondary"
                  gutterBottom
                >
                  {moment(prop.date)
                    .startOf("minute")
                    .fromNow()}
                </Typography>
                <Typography color="secondary" variant="h5" component="h2">
                  {prop.name}
                </Typography>
                <Typography className={classes.pos} color="secondary">
                  {prop.type}
                </Typography>
                <Typography component="p">{prop.completeaddress}</Typography>
                <Typography component="p">
                  Contact Info :{prop.contactNumber}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() =>
                    this.props.history.push(`/property/${prop._id}`)
                  }
                >
                  View {prop.type}
                </Button>
                <Button
                  size="small"
                  onClick={() =>
                    this.props.history.push(`/properties/booking/${prop._id}`)
                  }
                >
                  View Books ( {prop.books.length} )
                </Button>
              </CardActions>
            </Card>
          );
        })}
        <Fab
          className={classes.fab}
          color="secondary"
          onClick={() => {
            this.setState(prevState => ({
              displayInputForm: !prevState.displayInputForm
            }));
          }}
        >
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

Properties.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  properties: PropTypes.object.isRequired,
  addProperty: PropTypes.func.isRequired,
  getOwnProperties: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors,
  properties: state.properties
});

export default connect(
  mapStateToProps,
  { addProperty, getOwnProperties }
)(withRouter(withStyles(styles)(Properties)));
