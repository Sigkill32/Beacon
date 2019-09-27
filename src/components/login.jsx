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

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) this.props.onHandleAuth();
  }

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
        //this.props.history.push("/dashboard");
        localStorage.setItem("token", "test");
        this.props.onHandleAuth();
      })
      .catch(error => {
        console.log(error);
        this.setState({ error });
      });
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      console.log("enter");
      this.handleSubmit();
    }
  };

  render() {
    const { username, password, error, loggedIn } = this.state;
    console.log("auth", this.props.authenticated);
    return (
      <div className="login-wrapper">
        <div className="login">
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
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
      </div>
    );
  }
}

export default withRouter(Login);
