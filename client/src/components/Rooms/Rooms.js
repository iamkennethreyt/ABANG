import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { getRooms } from "../../actions/roomActions";

import Spinner from "../common/Spinner";
import Room from "../Properties/Room";

class Rooms extends Component {
  componentDidMount() {
    this.props.getRooms();
  }

  render() {
    console.log(this.props.rooms);
    return (
      <section className="container">
        {this.props.rooms.loading ? (
          <Spinner />
        ) : (
          this.props.rooms.rooms.map((room, i) => {
            return (
              <Room
              key={i}
                name={room.name}
                price={room.price}
                details={room.details}
                amenities={room.amenities}
              />
            );
          })
        )}
      </section>
    );
  }
}

Rooms.propTypes = {
  rooms: PropTypes.object.isRequired,
  getRooms: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  rooms: state.rooms
});
export default connect(
  mapStateToProps,
  { getRooms }
)(withRouter(Rooms));
