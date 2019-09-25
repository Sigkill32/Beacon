import React, { Component } from "react";
import { firebaseApp } from "../config/firebaseConf";
import { withRouter } from "react-router-dom";
import Spinner from "react-spinkit";

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: "",
    loggedIn: "init"
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { username, password } = this.state;
    this.setState({ loggedIn: "loggingIn" });
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(user => {
        this.setState({ loggedIn: "loggedIn" });
        this.props.history.push("/dashboard");
      })
      .catch(error => {
        console.log(error);
        this.setState({ error });
      });
  };

  logOutUser = () => {
    firebaseApp.auth().signOut();
  };

  render() {
    const { username, password, error, loggedIn } = this.state;
    const { authenticated } = this.props;
    return (
      <div className="login-wrapper">
        {authenticated ? (
          <div className="Already-logged">
            <h1>Seems Like you are logged in already</h1>
            <button onClick={this.logOutUser}>
              Logout to continue &#8594;
            </button>
          </div>
        ) : (
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
            {(() => {
              switch (loggedIn && error === null) {
                case "init":
                  return null;
                case "loggingIn":
                  return (
                    <div className="log-spin">
                      <Spinner name="circle" />
                    </div>
                  );
                default:
                  return null;
              }
            })()}
            {error ? <p>{error.message}</p> : null}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Login);
