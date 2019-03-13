import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextFieldGroup from "../common/TextFieldGroup";
import Room from "./Room";
import Input from "@material-ui/core/Input";

import {
  getProperty,
  addNewPhoneNumber,
  deleteNewPhoneNumber
} from "../../actions/propertyActions";
import {
  addRoom,
  getRoomsByProperty,
  deleteRoom
} from "../../actions/roomActions";
import Spinner from "../common/Spinner";

const styles = theme => ({
  fab: {
    position: "fixed",
    bottom: 90,
    right: theme.spacing.unit * 2
  }
});

class Property extends Component {
  state = {
    displayInputForm: false,
    phonenumber: "",
    network: "",
    amenities: "",
    details: "",
    price: "",
    name: "",
    errors: {}
  };
  componentDidMount() {
    this.props.getProperty(this.props.match.params.id);
    this.props.getRoomsByProperty(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newData = {
      amenities: this.state.amenities,
      details: this.state.details,
      price: this.state.price,
      name: this.state.name,
      property: this.props.properties.property._id
    };

    this.props.addRoom(newData, this.onSuccess);
  };

  onSuccess = () => {
    this.setState({
      displayInputForm: false,
      phonenumber: "",
      network: "",
      amenities: "",
      displayInputRoomForm: false,
      details: "",
      price: "",
      name: "",
      errors: {}
    });
  };

  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  render() {
    console.log("awwwww", this.props.rooms.rooms);
    console.log("rooms", this.props);
    return (
      <div>
        {this.props.properties.loading ||
        this.props.properties.property.user === undefined ? (
          <Spinner />
        ) : (
          <div>
            {this.state.displayInputForm ? (
              <form
                style={{
                  margin: ".5rem auto",
                  width: "90%",
                  border: "1px #ccc solid",
                  padding: ".7rem"
                }}
                action="/api/rooms"
                method="POST"
                enctype="multipart/form-data"
              >
                <div class="custom-file mb-3">
                  <input
                    type="file"
                    name="file"
                    id="file"
                    class="custom-file-input"
                  />
                  <label for="file" class="custom-file-label">
                    Choose File
                  </label>
                </div>
                <TextFieldGroup
                  placeholder="Name of the Room"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={this.state.errors.name}
                />
                <TextFieldGroup
                  placeholder="Price per month,  eg. 5,000"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange}
                  error={this.state.errors.price}
                />
                <TextFieldGroup
                  placeholder="Amenities use comma separtator eg. Water, Fan, Aircon"
                  name="amenities"
                  value={this.state.amenities}
                  onChange={this.onChange}
                  error={this.state.errors.amenities}
                  multiline={true}
                  rows="3"
                />
                <input
                  style={{ display: "none" }}
                  placeholder="properyyyy"
                  name="property"
                  value={this.props.properties.property._id}
                />
                <TextFieldGroup
                  placeholder="Other details here"
                  name="details"
                  value={this.state.details}
                  onChange={this.onChange}
                  error={this.state.errors.details}
                  multiline={true}
                  rows="3"
                />
                <Button
                  style={{ marginTop: ".3rem" }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={this.props.classes.submit}
                >
                  Submit
                </Button>
              </form>
            ) : null}
            <Card>
              <CardContent>
                <Typography variant="h5" color="secondary" component="h2">
                  {this.props.properties.property.name}
                </Typography>
                <Typography color="secondary">
                  {this.props.properties.property.type}
                </Typography>
                <Typography component="p">
                  {this.props.properties.property.completeaddress}
                </Typography>
                <Typography component="p">
                  Name of the owner : {this.props.properties.property.user.name}
                </Typography>
                <Typography component="p">
                  Email :{this.props.properties.property.user.email}
                </Typography>
                <Typography component="p">
                  Contact Info :{this.props.properties.property.contactNumber}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  // onClick={() =>
                  //   this.props.history.push(`/property/${prop._id}`)
                  // }
                >
                  {/* View {prop.type} */}
                </Button>
              </CardActions>
            </Card>
            <Typography
              variant="h5"
              style={{ textAlign: "center" }}
              component="h2"
            >
              LIST OF ROOMS
            </Typography>
            {this.props.rooms.loading ? (
              <Spinner />
            ) : (
              this.props.rooms.rooms.map((room, i) => {
                return (
                  <Room
                    name={room.name}
                    price={room.price}
                    details={room.details}
                    amenities={room.amenities}
                    propID={room.propID}
                    ID={room._id}
                    roomImage={room.roomImage}
                    toDelete={
                      this.props.properties.property.user._id ===
                      this.props.users.user.id
                        ? true
                        : false
                    }
                  />
                );
              })
            )}
            {this.props.properties.property.user._id ===
            this.props.users.user.id ? (
              <Fab
                className={this.props.classes.fab}
                color="secondary"
                onClick={() => {
                  this.setState(prevState => ({
                    displayInputForm: !prevState.displayInputForm
                  }));
                }}
              >
                <AddIcon />
              </Fab>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

Property.propTypes = {
  errors: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  rooms: PropTypes.object.isRequired,
  properties: PropTypes.object.isRequired,
  getProperty: PropTypes.func.isRequired,
  addNewPhoneNumber: PropTypes.func.isRequired,
  deleteNewPhoneNumber: PropTypes.func.isRequired,
  getRoomsByProperty: PropTypes.func.isRequired,
  addRoom: PropTypes.func.isRequired,
  deleteRoom: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  users: state.users,
  properties: state.properties,
  rooms: state.rooms
});
export default connect(
  mapStateToProps,
  {
    addNewPhoneNumber,
    getProperty,
    deleteNewPhoneNumber,
    addRoom,
    getRoomsByProperty,
    deleteRoom
  }
)(withRouter(withStyles(styles)(Property)));
