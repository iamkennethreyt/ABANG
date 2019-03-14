import CardMedia from "@material-ui/core/CardMedia";
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

class PropertyBooking extends Component {
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
    console.log("propertyyyy", this.props.properties.property.books);
    return (
      <div>
        {this.props.properties.loading ||
        this.props.properties.property.user === undefined ? (
          <Spinner />
        ) : (
          <div>
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
            </Card>
            <Typography
              variant="h5"
              style={{ textAlign: "center" }}
              component="h2"
            >
              LIST OF BOOKINGS
              {this.props.properties.loading ? (
                <Spinner />
              ) : (
                this.props.properties.property.books.map((book, i) => {
                  return (
                    <div>
                      <Card
                        style={{
                          justifyContent: "space-between",
                          display: "flex",
                          margin: ".3rem 0"
                        }}
                      >
                        <div>
                          <CardContent>
                            <Typography component="h5" variant="h5">
                              {book.name}
                            </Typography>
                            <Typography
                              variant="overline"
                              gutterBottom
                              color="textSecondary"
                            >
                              {book.email}
                            </Typography>
                            <Typography
                              variant="overline"
                              gutterBottom
                              color="textSecondary"
                            >
                              Room Name : {book.room.name}
                            </Typography>

                            {/* <Typography
                              variant="subtitle1"
                              color="textSecondary"
                            >
                              {`P${numberWithCommas(price)}/ month`}
                            </Typography> */}
                            <Typography
                              variant="overline"
                              gutterBottom
                              color="textSecondary"
                            >
                              details: {book.details}
                            </Typography>
                            <Typography
                              variant="overline"
                              gutterBottom
                              color="textSecondary"
                            >
                              phone: {book.phone}
                            </Typography>
                            {/* <Typography
                              variant="caption"
                              gutterBottom
                              color="secondary"
                            >
                              {amenities.map((amenity, index) => (
                                <span className="mr-2" key={index}>
                                  &#10004; {amenity}
                                </span>
                              ))}
                            </Typography>
                            {props.match.path === "/booking/:id"
                              ? null
                              : displaybutton} */}
                          </CardContent>
                        </div>
                        <CardMedia
                          //   className={classes.cover}
                          style={{ width: 200 }}
                          image={`/api/rooms/image/${book.room.roomImage}`}
                          title="Live from space album cover"
                        />
                      </Card>
                    </div>
                  );
                })
              )}
            </Typography>
            <div style={{ height: 100 }} />
          </div>
        )}
      </div>
    );
  }
}

PropertyBooking.propTypes = {
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
)(withRouter(withStyles(styles)(PropertyBooking)));
