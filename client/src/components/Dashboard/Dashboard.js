import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProperties } from "../../actions/propertyActions";

import AddLocation from "@material-ui/icons/AddLocation";
import Typography from "@material-ui/core/Typography";

import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text, propID }) => (
  <Link to={`/property/${propID}`}>
    <AddLocation fontSize="large" color="secondary">
      {text}
    </AddLocation>
    <Typography style={{ textAlign: "center" }}>{text}</Typography>
  </Link>
);

class DashBoard extends Component {
  componentDidMount() {
    this.props.getProperties();
  }
  state = {};

  static defaultProps = {
    center: {
      lat: 10.3018,
      lng: 123.8919
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
