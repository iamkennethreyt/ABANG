import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import Axios from "axios";
import { deleteRoom } from "../../actions/roomActions";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Switch from "@material-ui/core/Switch";

const numberWithCommas = x =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const styles = theme => ({
  card: {
    display: "flex"
  },
  details: {
    // display: "flex",
    // flexDirection: "column"
  },
  content: {
    flex: ""
  },
  cover: {
    width: 200
  }
});

const Room = props => {
  // console.log();
  let displaybutton;
  let displayswitch;
  const {
    propname,
    classes,
    name,
    price,
    details,
    amenities,
    roomImage,
    propID,
    toDelete,
    ID,
    status
  } = props;
  if (toDelete) {
    displaybutton = (
      <Button
        type="button"
        variant="outlined"
        color="secondary"
        style={{ marginTop: ".8rem" }}
        onClick={() => {
          props.deleteRoom(ID);
        }}
      >
        Delete
      </Button>
    );

    displayswitch = (
      <Switch
        onChange={e => {
          Axios.put(`/api/rooms/changestatus/${ID}`, {
            status: e.target.checked
          });
        }}
        defaultChecked={status}
      />
    );
  } else {
    displaybutton = (
      <Button
        type="button"
        variant="outlined"
        color="secondary"
        style={{ marginTop: ".8rem" }}
        onClick={() => props.history.push(`/booking/${ID}`)}
      >
        Book Now
      </Button>
    );
  }
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
          <CardContent className={classes.content}>
            <Typography variant="overline" gutterBottom color="textSecondary">
              {propname}
            </Typography>
            <Typography component="h5" variant="h5">
              {name}
            </Typography>

            <Typography variant="subtitle1" color="textSecondary">
              {`P${numberWithCommas(price)}/ month`}
            </Typography>
            <Typography variant="overline" gutterBottom color="textSecondary">
              {details}
            </Typography>
            <Typography variant="caption" gutterBottom color="secondary">
              {amenities.map((amenity, index) => (
                <span className="mr-2" key={index}>
                  &#10004; {amenity}
                </span>
              ))}
            </Typography>
            {props.match.path === "/booking/:id" ? null : displaybutton}
            {props.match.path === "/booking/:id" ? null : displayswitch}
          </CardContent>
        </div>
        <CardMedia
          className={classes.cover}
          image={`/api/rooms/image/${roomImage}`}
          title="Live from space album cover"
        />
      </Card>
    </div>
  );
};

Room.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  amenities: PropTypes.array.isRequired,
  deleteRoom: PropTypes.func.isRequired
};

// Axios.delete(`/api/rooms/room/${ID}`);

export default connect(
  null,
  { deleteRoom }
)(withRouter(withStyles(styles, { withTheme: true })(Room)));
