import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProperties } from "../../actions/propertyActions";

import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => text;

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
