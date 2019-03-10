import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getOwnProperties, addProperty } from "../../actions/propertyActions";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaGroup from "../common/TextAreaGroup";
import SelectListGroup from "../common/SelectListGroup";
import Spinner from "../common/Spinner";

class Properties extends Component {
  state = {
    displayInputForm: false,
    long: "",
    lat: "",
    name: "",
    completeaddress: "",
    type: "",
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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newData = {
      name: this.state.name,
      type: this.state.type,
      completeaddress: this.state.completeaddress,
      long: this.state.long,
      lat: this.state.lat
    };

    this.props.addProperty(newData, this.onSuccess);
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
  render() {
    const { errors } = this.state;
    let displayInputForm;

    // Select options for status
    const options = [
      { label: "* Select Property Type", value: 0 },
      { label: "Boarding House", value: "Boarding House" },
      { label: "Apartment", value: "Apartment" },
      { label: "Hotel", value: "Hotel" },
      { label: "Condo", value: "Condo" }
    ];

    if (this.state.displayInputForm) {
      displayInputForm = (
        <div className="row">
          <div className="col-md-8 m-auto">
            <form className=" border border-light p-5" onSubmit={this.onSubmit}>
              <p className="h4 mb-4 text-center">Add New Property</p>
              <TextFieldGroup
                placeholder="Property Name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                error={errors.name}
              />
              <SelectListGroup
                placeholder="Property type"
                name="type"
                value={this.state.type}
                onChange={this.onChange}
                options={options}
                error={errors.type}
              />
              <TextAreaGroup
                placeholder="Complete Address"
                name="completeaddress"
                value={this.state.completeaddress}
                onChange={this.onChange}
                error={errors.completeaddress}
              />
              <label htmlFor="coordinates">Input your Coordinates</label>
              <div id="coordinates" className="row">
                <div className="col-md-6 col-sm-6">
                  <TextFieldGroup
                    placeholder="Lattitude"
                    name="lat"
                    value={this.state.lat}
                    onChange={this.onChange}
                    error={errors.lat}
                  />
                </div>
                <div className="col-md-6 col-sm-6">
                  <TextFieldGroup
                    placeholder="Longitude"
                    name="long"
                    value={this.state.long}
                    onChange={this.onChange}
                    error={errors.long}
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
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        {displayInputForm}
        <div className="d-flex flex-row-reverse bd-highlight">
          <button
            type="button"
            class="btn purple darken-4"
            onClick={() => {
              this.setState(prevState => ({
                displayInputForm: !prevState.displayInputForm
              }));
            }}
          >
            {this.state.displayInputForm ? "Cancel" : "Add Property"}
          </button>
        </div>
        {this.props.properties.loading ? (
          <Spinner />
        ) : (
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Property Name</th>
                <th scope="col">Complete Address</th>
                <th scope="col">Property Type</th>
                <th scope="col">Longitude</th>
                <th scope="col">Lattitude</th>
              </tr>
            </thead>
            <tbody>
              {this.props.properties.properties.map((property, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{property.name}</td>
                    <td>{property.completeaddress}</td>
                    <td>{property.type}</td>
                    <td>{property.coordinates.long}</td>
                    <td>{property.coordinates.lat}</td>
                    <td>
                      <Link to={`/property/${property._id}`}>View</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

Properties.propTypes = {
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
)(withRouter(Properties));
