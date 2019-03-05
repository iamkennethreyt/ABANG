import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { getRooms } from "../../actions/roomActions";

import Spinner from "../common/Spinner";

class DashBoard extends Component {
  componentDidMount() {
    this.props.getRooms();
  }
  state = {};
  render() {
    return (
      <section className="my-5 container">
        {this.props.rooms.loading ? (
          <Spinner />
        ) : (
          this.props.rooms.rooms.map((room, i) => {
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
                  <h3 className="font-weight-bold orange-text mb-3">
                    <strong>{room.name}</strong>
                  </h3>
                  <h6>Contact Info</h6>
                  {room.contactinfo.map((ci, i) => (
                    <span className="mr-2" key={i}>
                      {ci.network} : <strong>{ci.phonenumber}</strong>
                    </span>
                  ))}

                  <p>{room.details}</p>
                  <p>
                    Name of Property :
                    <Link to={`/property/${room.propID}`}>{room.propname}</Link>
                  </p>
                  <p>
                    Type of Property :<strong>{room.proptype}</strong>
                  </p>
                  <p>
                    date posted{" "}
                    <strong>{moment(room.date).format("LL")}</strong>
                  </p>
                </div>
                <div className="row">
                  <div className="col-lg-2 col-md-12 mb-4">
                    <div className="view overlay z-depth-1-half">
                      <img
                        src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(73).jpg"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-6 mb-4">
                    <div className="view overlay z-depth-1-half">
                      <img
                        src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(78).jpg"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-6 mb-4">
                    <div className="view overlay z-depth-1-half">
                      <img
                        src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(79).jpg"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-12 mb-4">
                    <div className="view overlay z-depth-1-half">
                      <img
                        src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(81).jpg"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-6 mb-4">
                    <div className="view overlay z-depth-1-half">
                      <img
                        src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(82).jpg"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>

                  <div className="col-lg-2 col-md-6 mb-4">
                    <div className="view overlay z-depth-1-half">
                      <img
                        src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(84).jpg"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>
    );
  }
}

DashBoard.propTypes = {
  rooms: PropTypes.object.isRequired,
  getRooms: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  rooms: state.rooms
});
export default connect(
  mapStateToProps,
  {
    getRooms
  }
)(withRouter(DashBoard));
