import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CreditCardInput from "react-credit-card-input";
import TextFieldGroup from "../common/TextFieldGroup";
import { signup } from "../../actions/userActions";
import _ from "lodash";
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";

const styles = theme => ({
  root: {
    width: "90%"
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

class VerticalLinearStepper extends React.Component {
  state = {
    cardNumber: "",
    cvc: "",
    expiry: "",
    message: "",
    activeStep: 0,
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {},
    open: false
  };

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

    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password,
      type: "lessor"
    };

    this.props.signup(userData, this.props.history, this.handleOpen);
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            maiores mollitia accusantium velit veritatis laboriosam, nisi
            possimus unde id fuga atque blanditiis ipsum distinctio autem
            recusandae odio est sunt quos modi consequatur reprehenderit nulla
            obcaecati. Sit, asperiores dolores atque nulla ratione quia
            accusantium eos modi libero recusandae vel praesentium nostrum!
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
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              error={this.state.errors.password}
            />
            <TextFieldGroup
              placeholder="Confirm Password"
              name="password2"
              type="password"
              value={this.state.password2}
              onChange={this.onChange}
              error={this.state.errors.password2}
            />
          </div>
        );
      default:
        return "Unknown step";
    }
  };

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
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
              Proceed to Login
            </Button>
          </Paper>
        )}
        <Snackbar
          color="success"
          open={this.state.open}
          onClose={() => {
            this.setState({ open: false });
            this.props.history.push("/signin");
          }}
          TransitionComponent={Fade}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">You Successfully Registered an Account</span>
          }
        />
      </div>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object,
  signup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { signup }
  )(withRouter(VerticalLinearStepper))
);
