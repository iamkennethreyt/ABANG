import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
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
import TextAreaGroup from "../common/TextAreaGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import Spinner from "../common/Spinner";

class Property extends Component {
  state = {
    displayInputForm: false,
    phonenumber: "",
    network: "",
    amenities: "",
    displayInputRoomForm: false,
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
      network: this.state.network,
      phonenumber: this.state.phonenumber,
      id: this.props.match.params.id
    };

    this.props.addNewPhoneNumber(newData, this.onSuccess);
  };

  onSubmitRoom = e => {
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
    const { errors } = this.state;
    const options = [
      { label: "* Network Type", value: 0 },
      { label: "Smart", value: "Smart" },
      { label: "Globe", value: "Globe" },
      { label: "Sun", value: "Sun" }
    ];
    return this.props.properties.property.loading ||
      this.props.properties.property === null ||
      this.props.properties.property === undefined ||
      this.props.properties.property.user === undefined ? (
      <Spinner />
    ) : (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>{this.props.properties.property.name}</h1>
            <h3>{this.props.properties.property.type}</h3>
            <h5>{this.props.properties.property.completeaddress}</h5>
            {this.props.properties.property.contactinfo !== undefined ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Network</th>
                    <th scope="col">Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.properties.property.contactinfo.map((ci, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{ci.network}</td>
                        <td>{ci.phonenumber}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-link"
                            onClick={() =>
                              this.props.deleteNewPhoneNumber({
                                id: this.props.properties.property._id,
                                _id: ci._id
                              })
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <Spinner />
            )}
          </div>
          <div className="col-md-6">
            {this.state.displayInputForm ? (
              <form
                className=" border border-light p-5"
                onSubmit={this.onSubmit}
              >
                <p className="h4 mb-4 text-center">Add New Number</p>

                <label htmlFor="phone">Input your Contact Details</label>
                <div id="phone" className="row">
                  <div className="col-md-6 col-sm-6">
                    <SelectListGroup
                      placeholder="Network type"
                      name="network"
                      value={this.state.network}
                      onChange={this.onChange}
                      options={options}
                      error={errors.network}
                    />
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <TextFieldGroup
                      placeholder="Phone number"
                      name="phonenumber"
                      value={this.state.phonenumber}
                      onChange={this.onChange}
                      error={errors.phonenumber}
                    />
                  </div>
                </div>

                <button
                  className="btn purple darken-4 btn-block my-4"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            ) : null}
            <div className="d-flex flex-row-reverse bd-highlight">
              {this.props.users.user.id ===
              this.props.properties.property.user._id ? (
                <button
                  type="button"
                  className="btn purple darken-4"
                  onClick={() => {
                    this.setState(prevState => ({
                      displayInputForm: !prevState.displayInputForm
                    }));
                  }}
                >
                  {this.state.displayInputForm ? "Cancel" : "Add Phone Number"}
                </button>
              ) : null}
            </div>

            {this.state.displayInputRoomForm ? (
              <form
                className=" border border-light p-5"
                onSubmit={this.onSubmitRoom}
              >
                <p className="h4 mb-4 text-center">Add New Room</p>
                <TextFieldGroup
                  placeholder="Room Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />

                <TextFieldGroup
                  placeholder="Room Price"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange}
                  error={errors.price}
                />

                <TextAreaGroup
                  placeholder="Other Details"
                  name="details"
                  value={this.state.details}
                  onChange={this.onChange}
                  error={errors.details}
                />

                <TextAreaGroup
                  placeholder="Amenities"
                  name="amenities"
                  value={this.state.amenities}
                  onChange={this.onChange}
                  error={errors.amenities}
                  info="Please use comma separator for amenities eg. Aircon, Fan, Free Water"
                />

                <button
                  className="btn purple darken-4 btn-block my-4"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            ) : null}
            <div className="d-flex flex-row-reverse bd-highlight">
              {this.props.users.user.id ===
              this.props.properties.property.user._id ? (
                <button
                  type="button"
                  className="btn purple darken-4"
                  onClick={() => {
                    this.setState(prevState => ({
                      displayInputRoomForm: !prevState.displayInputRoomForm
                    }));
                  }}
                >
                  {this.state.displayInputRoomForm ? "Cancel" : "Add New Room"}
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <h4>Rooms</h4>
        <section className="my-5">
          {this.props.rooms.rooms.map((room, i) => {
            return (
              <div className="row mt-3 border-top p-3" key={i}>
                <div className="col-lg-4">
                  <div className="view overlay rounded z-depth-2 mb-lg-0 mb-4">
                    <img
                      className="img-fluid"
                      src="https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg"
                      alt="yahooo"
                    />
                    <div className="mask rgba-white-slight" />
                  </div>
                </div>
                <div className="col-lg-8">
                  <a href="#!" className="green-text">
                    <h6 className="font-weight-bold mb-3">
                      {room.amenities.map((amenity, index) => (
                        <span className="mr-2" key={index}>
                          <i className="fa fa-check" /> {amenity}
                        </span>
                      ))}
                    </h6>
                  </a>
                  <h3 className="font-weight-bold purple-text mb-3">
                    <strong>{room.name}</strong>
                  </h3>
                  <h4 className="font-weight-bold red-text mb-3">
                    P {this.numberWithCommas(room.price)} per month
                  </h4>
                  <p>{room.details}</p>
                  <p>
                    date posted{" "}
                    <strong>{moment(room.date).format("LL")}</strong>
                  </p>
                </div>
              </div>
            );
          })}
        </section>
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
)(withRouter(Property));
