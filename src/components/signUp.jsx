import React, { Component } from "react";
import { firebaseApp } from "../config/firebaseConf";
import { withRouter } from "react-router-dom";

class SignUp extends Component {
  state = {
    username: "",
    password: "",
    error: null
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { username, password } = this.state;
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(username, password)
      .then(user => {
        this.props.history.push("/");
      })
      .catch(error => this.setState({ error }));
  };

  render() {
    const { username, password, error } = this.state;
    return (
      <div className="sign-up">
        <input
          type="text"
          name="username"
          onChange={this.handleChange}
          value={username}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          onChange={this.handleChange}
          value={password}
          placeholder="Password"
        />
        <button onClick={this.handleSubmit}>Sign Up</button>
        {error ? <p>{error.message}</p> : null}
      </div>
    );
  }
}

export default withRouter(SignUp);
