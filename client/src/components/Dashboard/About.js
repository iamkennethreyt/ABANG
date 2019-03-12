import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Axios from "axios";
class About extends Component {
  state = {
    errors: {},
    message: "",
    email: ""
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      message: this.state.message
    };

    Axios.post("/api/users/sendemailtoadmin", userData)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <Typography
          align="center"
          component="h2"
          variant="display1"
          gutterBottom
        >
          ABANG PH
        </Typography>
        <Typography gutterBottom align="justify">
          {`
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati voluptate assumenda explicabo animi reiciendis blanditiis, asperiores natus saepe enim minus vero rem! Deserunt natus voluptatem reiciendis consequuntur, nisi porro accusantium? Voluptatum reiciendis facere iusto exercitationem minima illo corrupti ducimus, expedita dolore perspiciatis commodi id esse earum voluptatibus, at assumenda.
        `}
        </Typography>
        <Typography align="center" variant="title" gutterBottom>
          Comments or Suggestions? Don't hesitate to message to the developers
          to improve more our App.
        </Typography>
        <form onSubmit={this.onSubmit} noValidate>
          <TextFieldGroup
            placeholder="Email Address"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
          />
          <TextFieldGroup
            placeholder="Your Message to Us"
            name="message"
            value={this.state.message}
            onChange={this.onChange}
            error={errors.message}
            multiline={true}
            rows="4"
          />
          <Button
            style={{ marginTop: ".6rem" }}
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default About;
