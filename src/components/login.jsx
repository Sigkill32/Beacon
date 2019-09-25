import React, { Component } from "react";
import { firebaseApp } from "../config/firebaseConf";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { username, password } = this.state;
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(user => {
        this.props.history.push("/dashboard");
      })
      .catch(error => {
        console.log(error);
        this.setState({ error });
      });
  };

  render() {
    const { username, password, error } = this.state;
    return (
      <>
        <div className="login">
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>Login</button>
          {error ? <p>{error.message}</p> : null}
        </div>
      </>
    );
  }
}

export default withRouter(Login);
