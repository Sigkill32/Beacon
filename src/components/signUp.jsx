import React, { Component } from "react";
import { firebaseApp } from "../config/firebaseConf";
import { withRouter } from "react-router-dom";

class SignUp extends Component {
  state = {
    username: "",
    password: "",
    confPass: "",
    error: null
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { username, password, confPass } = this.state;
    if (this.verifyPass(password, confPass)) {
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(username, password)
        .then(user => {
          this.props.history.push("/login");
        })
        .catch(error => this.setState({ error }));
    } else this.setState({ error: { message: "Passwords do not match" } });
  };

  verifyPass = (password, confPass) => {
    return confPass === password ? true : false;
  };

  logOutUser = () => {
    firebaseApp.auth().signOut();
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) this.handleSubmit();
  };

  render() {
    const { username, password, error, confPass } = this.state;
    const { authenticated } = this.props;
    return (
      <div className="sign-up-wrapper">
        {authenticated ? (
          <div className="Already-logged">
            <h1>You need to logout to register a new user</h1>
            <button onClick={this.logOutUser}>Logout</button>
          </div>
        ) : (
          <div className="sign-up">
            <input
              type="text"
              name="username"
              onChange={this.handleChange}
              value={username}
              placeholder="Username"
              onKeyDown={this.handleKeyDown}
            />
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
              value={password}
              placeholder="Password"
              onKeyDown={this.handleKeyDown}
            />
            <input
              type="password"
              onChange={this.handleChange}
              value={confPass}
              name="confPass"
              placeholder="Re-Enter the password"
              onKeyDown={this.handleKeyDown}
            />
            <button onClick={this.handleSubmit}>Sign Up</button>
            {error ? <p>{error.message}</p> : null}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(SignUp);
