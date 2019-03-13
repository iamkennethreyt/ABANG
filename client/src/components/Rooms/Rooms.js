import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { getRooms } from "../../actions/roomActions";

import Spinner from "../common/Spinner";
import Room from "../Properties/Room";
import Fuse from "fuse.js";
import FormControl from "@material-ui/core/FormControl";

import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

const options = {
  caseSensitive: false,
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 0,
  keys: ["name", "details", "amenities"]
};

class Rooms extends Component {
  state = {
    onsearch: ""
  };

  componentDidMount() {
    this.props.getRooms();
  }

  render() {
    const fused = new Fuse(this.props.rooms.rooms, options);
    let rooms =
      this.state.onsearch === ""
        ? this.props.rooms.rooms
        : fused.search(this.state.onsearch);
    return (
      <section className="container">
        <FormControl fullWidth>
          <InputLabel htmlFor="search">Seach Anything</InputLabel>
          <Input
            id="search"
            onChange={e => this.setState({ onsearch: e.target.value })}
          />
        </FormControl>
        {this.props.rooms.loading ? (
          <Spinner />
        ) : (
          rooms.map((room, i) => {
            return (
              <Room
                key={i}
                name={room.name}
                price={room.price}
                details={room.details}
                amenities={room.amenities}
                roomImage={room.roomImage}
                propID={room.propID}
                toDelete={false}
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
