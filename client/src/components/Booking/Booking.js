import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import Spinner from "../common/Spinner";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CreditCardInput from "react-credit-card-input";
import TextFieldGroup from "../common/TextFieldGroup";
import { getRoom, bookRoom } from "../../actions/roomActions";
import Room from "../Properties/Room";

import _ from "lodash";

const styles = theme => ({
  root: {
    width: "90%"
  },
  cover: {
    width: 170
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  }
});

class Booking extends React.Component {
  state = {
    cardNumber: "",
    cvc: "",
    expiry: "",
    message: "",
    activeStep: 0,
    name: "",
    email: "",
    phonenumber: "",
    details: "",
    errors: {},
    open: false
  };

  numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  componentDidMount() {
    this.props.getRoom(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      room: this.props.rooms.room._id,
      id: this.props.rooms.room.propertyid,
      owneremail: this.props.rooms.room.owneremail,
      name: this.state.name,
      email: this.state.email,
      phonenumber: this.state.phonenumber,
      details: this.state.details
    };

    this.props.bookRoom(data);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getSteps = () => {
    return ["Terms & Condition", "Payment Method", "Information"];
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Typography variant="body1">
            These Terms govern your use of Abang and the products, features,
            app, services, technologies and software we offer.
          </Typography>
        );
      case 1:
        return (
          <Typography variant="body1">
            <CreditCardInput
              cardNumberInputProps={{}}
              cardExpiryInputProps={{}}
              cardCVCInputProps={{}}
              fieldClassName="input"
            />
          </Typography>
        );
      case 2:
        return (
          <div>
            <TextFieldGroup
              placeholder="Complete Name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              error={this.state.errors.name}
            />
            <TextFieldGroup
              placeholder="Email Address"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              error={this.state.errors.email}
            />
            <TextFieldGroup
              placeholder="Contact Info"
              name="phonenumber"
              value={this.state.phonenumber}
              onChange={this.onChange}
              error={this.state.errors.phonenumber}
            />
            <TextFieldGroup
              placeholder="Put some details here..."
              name="details"
              value={this.state.details}
              onChange={this.onChange}
              error={this.state.errors.details}
              rows="3"
              multiline={true}
            />
          </div>
        );
      default:
        return "Unknown step";
    }
  };

  render() {
    let displayroom;
    if (this.props.rooms.loading || _.isEmpty(this.props.rooms.room)) {
      displayroom = <Spinner />;
    } else {
      displayroom = (
        <div>
          <Room
            propname={this.props.rooms.room.propname}
            name={this.props.rooms.room.roomname}
            price={this.props.rooms.room.price}
            details={this.props.rooms.room.details}
            amenities={this.props.rooms.room.amenities}
            roomImage={this.props.rooms.room.roomImage}
            // propID={this.props.rooms.room.property._id}
            toDelete={false}
          />
        </div>
      );
    }
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        {displayroom}
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                {this.getStepContent(index)}
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={
                        activeStep === steps.length - 1
                          ? this.onSubmit
                          : this.handleNext
                      }
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>

            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Back to Home
            </Button>
          </Paper>
        )}
        <div style={{ height: 100 }} />
      </div>
    );
  }
}

Booking.propTypes = {
  classes: PropTypes.object,
  getRoom: PropTypes.func.isRequired,
  bookRoom: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  rooms: state.rooms
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { getRoom, bookRoom }
  )(withRouter(Booking))
);
