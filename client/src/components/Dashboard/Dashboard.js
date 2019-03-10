import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProperties } from "../../actions/propertyActions";

import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text, propID, logo }) => (
  <div className="font-weight-bold">
    <i className={`${logo} fa-lg fa-2x`} />
    <Link to={`/property/${propID}`}>
      <p>{text}</p>
    </Link>
  </div>
);

class DashBoard extends Component {
  componentDidMount() {
    this.props.getProperties();
  }
  state = {};

  static defaultProps = {
    center: {
      lat: 10.3157,
      lng: 123.8854
    },
    zoom: 16
  };

  handleLogo = e => {
    if (e === "Boarding House") {
      return "fas fa-home red-text";
    }
    if (e === "Apartment") {
      return "fas fa-warehouse blue-text";
    }
    if (e === "Hotel") {
      return "fas fa-hotel green-text";
    }
    if (e === "Condo") {
      return "fas fa-building yellow-text";
    }
  };

  render() {
    return (
      <section className="container">
        <div style={{ height: "80vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyCadUpeKGSY6XNsBHB2thxvffwjkJQsaX4"
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            {this.props.properties.properties.map((p, i) => {
              return (
                <AnyReactComponent
                  key={i}
                  lat={p.coordinates.lat}
                  lng={p.coordinates.long}
                  text={p.name}
                  propID={p._id}
                  logo={this.handleLogo(p.type)}
                />
              );
            })}
          </GoogleMapReact>
        </div>
      </section>
    );
  }
}

DashBoard.propTypes = {
  properties: PropTypes.object.isRequired,
  getProperties: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  properties: state.properties
});
export default connect(
  mapStateToProps,
  {
    getProperties
  }
)(withRouter(DashBoard));
