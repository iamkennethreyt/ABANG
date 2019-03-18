import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { getRooms } from "../../actions/roomActions";

import Spinner from "../common/Spinner";
import Room from "../Properties/Room";
import Fuse from "fuse.js";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
    onsearch: "",
    price: 1000000,
    open: false
  };

  componentDidMount() {
    this.props.getRooms();
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    console.log(this.state.price);
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

        <FormControl fullWidth>
          <InputLabel htmlFor="demo-controlled-open-select">
            Range Price
          </InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.price}
            onChange={e => this.setState({ price: e.target.value })}
            inputProps={{
              name: "price",
              id: "demo-controlled-open-select"
            }}
          >
            <MenuItem value={1000000}>
              <em>All</em>
            </MenuItem>
            <MenuItem value={12000}>12,000</MenuItem>
            <MenuItem value={10000}>10,000</MenuItem>
            <MenuItem value={8000}>8,000</MenuItem>
            <MenuItem value={6000}>6,000</MenuItem>
            <MenuItem value={5000}>5,000</MenuItem>
            <MenuItem value={4000}>4,000</MenuItem>
            <MenuItem value={3000}>3000</MenuItem>
            <MenuItem value={2000}>2,000</MenuItem>
          </Select>
        </FormControl>
        {this.props.rooms.loading ? (
          <Spinner />
        ) : (
          rooms
            .filter(room => room.status)
            .filter(room => room.price <= this.state.price)
            .map((room, i) => {
              return (
                <Room
                  key={i}
                  name={room.name}
                  propname={room.propname}
                  price={room.price}
                  details={room.details}
                  amenities={room.amenities}
                  roomImage={room.roomImage}
                  propID={room.propID}
                  toDelete={false}
                  ID={room._id}
                />
              );
            })
        )}
        <div style={{ height: 100 }} />
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
