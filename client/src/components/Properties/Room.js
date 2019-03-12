import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";

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
    width: 170
  }
});

const Room = props => {
  const { classes, theme, name, price, details, amenities } = props;

  return (
    <Card
      style={{
        justifyContent: "space-between",
        display: "flex",
        margin: ".3rem 0"
      }}
    >
      <div>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {`P${numberWithCommas(price)}/ month`}
          </Typography>
          <Typography variant="overline" gutterBottom  color="textSecondary">
            {details}
          </Typography>
          <Typography variant="caption" gutterBottom color="secondary">
            {amenities.map((amenity, index) => (
              <span className="mr-2" key={index}>
                &#10004; {amenity}
              </span>
            ))}
          </Typography>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image={`https://static01.nyt.com/images/2018/09/23/realestate/23fix1/oakImage-1536872349845-articleLarge.jpg?quality=75&auto=webp&disable=upscale`}
        title="Live from space album cover"
      />
    </Card>
  );
};

Room.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  amenities: PropTypes.array.isRequired
};

export default withStyles(styles, { withTheme: true })(Room);
