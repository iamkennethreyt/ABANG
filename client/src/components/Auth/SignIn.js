import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signin } from "../../actions/userActions";
import TextFieldGroup from "../common/TextFieldGroup";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.users.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.signin(userData);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="row">
        <div className="col-md-4 m-auto">
          <form className=" border border-light p-5" onSubmit={this.onSubmit}>
            <p className="h4 mb-4 text-center">Sign in</p>
            <TextFieldGroup
              placeholder="Email Address"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />
            <TextFieldGroup
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />
            <button className="btn btn-info btn-block my-4" type="submit">
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  signin: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { signin }
)(SignIn);
