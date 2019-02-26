import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { accountSettings, getUser } from "../../actions/userActions";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaGroup from "../common/TextAreaGroup";

class AccountSettings extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      completeaddress: "",
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getUser(this.props.users.user.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.users.userByID) {
      const { completeaddress, name, email } = nextProps.users.userByID;
      this.setState({ completeaddress, name, email });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      completeaddress: this.state.completeaddress
    };

    this.props.accountSettings(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="row">
        <div className="col-md-4 m-auto">
          <form className=" border border-light p-5" onSubmit={this.onSubmit}>
            <p className="h4 mb-4 text-center">Account Settings</p>
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
              disabled={true}
            />
            <TextAreaGroup
              placeholder="Complete Address"
              name="completeaddress"
              value={this.state.completeaddress}
              onChange={this.onChange}
              error={errors.completeaddress}
            />

            <button
              className="btn orange darken-4 btn-block my-4"
              type="submit"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    );
  }
}

AccountSettings.propTypes = {
  getUser: PropTypes.func.isRequired,
  accountSettings: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { accountSettings, getUser }
)(withRouter(AccountSettings));
