import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../../../actions/userActions";
import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaGroup from "../../common/TextAreaGroup";

class Lessor extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      completeaddress: "",
      password: "",
      password2: "",

      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.users.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      completeaddress: this.state.completeaddress,
      password: this.state.password,
      password2: this.state.password2,
      type: "lessor"
    };

    this.props.signup(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="row">
        <div className="col-md-4 m-auto">
          <form className=" border border-light p-5" onSubmit={this.onSubmit}>
            <p className="h4 mb-4 text-center">Sign Up Lessor</p>
            <TextFieldGroup
              placeholder="Complete Name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextFieldGroup
              placeholder="Email Address"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />
            <TextAreaGroup
              placeholder="Complete Address"
              name="completeaddress"
              value={this.state.completeaddress}
              onChange={this.onChange}
              error={errors.completeaddress}
            />
            <TextFieldGroup
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />
            <TextFieldGroup
              placeholder="Confirm Password"
              name="password2"
              type="password"
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
            />
            <button
              className="btn orange darken-4 btn-block my-4"
              type="submit"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Lessor.propTypes = {
  signup: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { signup }
)(withRouter(Lessor));
