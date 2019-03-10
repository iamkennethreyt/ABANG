import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { passwordSettings } from "../../actions/userActions";
import TextFieldGroup from "../common/TextFieldGroup";

class PasswordSettings extends Component {
  state = {
    password: "",
    password2: "",
    password3: "",
    errors: {}
  };

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

    const data = {
      password: this.state.password,
      password2: this.state.password2,
      password3: this.state.password3
    };
    this.props.passwordSettings(data, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="row">
        <div className="col-md-4 m-auto">
          <form className=" border border-light p-5" onSubmit={this.onSubmit}>
            <p className="h4 mb-4 text-center">Password Settings</p>
            <TextFieldGroup
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />
            <TextFieldGroup
              placeholder="New Password"
              type="password"
              name="password2"
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
            />
            <TextFieldGroup
              placeholder="Confirm Password"
              type="password"
              name="password3"
              value={this.state.password3}
              onChange={this.onChange}
              error={errors.password3}
            />

            <button
              type="submit"
              className="btn purple darken-4 btn-block mt-4 "
            >
              Save Changes
            </button>
            <Link to="/" className="btn purple darken-4 btn-block mt-2">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

PasswordSettings.protoTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  passwordSettings: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { passwordSettings }
)(withRouter(PasswordSettings));
