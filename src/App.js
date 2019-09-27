import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { db, firebaseApp } from "./config/firebaseConf";
import "./App.css";
import Dashboard from "./components/dashboard";
import Nav from "./components/nav";
import Login from "./components/login";
import SignUp from "./components/signUp";
import ProtectedRoute from "./components/protectedRoute";

class App extends Component {
  state = {
    authenticated: false,
    users: [],
    name: "",
    sub: "",
    email: "",
    message: "",
    closed: true,
    noEmailButton: "init" // "init" = show button || "form" = show form || "sent" = show confirmation
  };

  async componentDidMount() {
    await this.getData();
    const token = localStorage.getItem("token");
    let auth = false;
    if (token) {
      firebaseApp.auth().onAuthStateChanged(authenticated => {
        authenticated
          ? console.log(authenticated)
          : this.setState({ authenticated: false });
      });
    }
    if (auth === true) {
      localStorage.setItem("token", "test");
      this.setState({ authenticated: true });
    }
    console.log(this.state.authenticated);
  }

  // componentDidUpdate() {
  //   console.log("comp did up", this.state.authenticated);
  // }

  getData = async () => {
    let users = [];
    try {
      const collection = await db.collection("Users").get();
      const docs = collection.docs.map(doc => doc.data());
      docs.map(doc =>
        users.push({
          name: doc.name,
          email: doc.email,
          message: doc.message,
          sub: doc.sub
        })
      );
      this.setState({ users });
    } catch (error) {
      console.log(error);
    }
  };

  writeData = async (name, email, sub, message) => {
    try {
      await db.collection("Users").add({
        name: name,
        sub: sub,
        email: email,
        message: message
      });
    } catch (error) {
      console.log(error);
      const users = this.state.users;
      users.pop();
      this.setState({ users });
    }
  };

  handleSend = () => {
    const { name, sub, email, message } = this.state;
    const result = this.validateForm(name, email, sub, message);
    if (result) {
      let users = [...this.state.users, { name, sub, email, message }];
      this.setState({
        name: "",
        sub: "",
        email: "",
        message: "",
        users,
        noEmailButton: "sent"
      });
      this.writeData(name, email, sub, message);
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleMessage = () => {
    this.setState({ closed: false });
  };

  handleClose = () => {
    this.setState({ closed: true });
  };

  validateForm = (name, email, sub, message) => {
    const emailRegex = new RegExp(
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/
    );
    const isEmailValid = emailRegex.test(email.trim());
    const isNameValid = this.validateStr(name.trim());
    const isSubValid = this.validateStr(sub.trim());
    const isMessageValid = this.validateStr(message.trim());

    return isEmailValid && isNameValid && isSubValid && isMessageValid
      ? true
      : false;
  };

  validateStr = str => {
    return str === "" ? false : true;
  };

  handleUpload = () => {
    this.upload.click();
  };

  handleEmailButton = () => {
    this.setState({ noEmailButton: "form" });
  };

  handleBack = () => {
    this.setState({ noEmailButton: "init" });
  };

  setAuth = () => {
    this.setState({ authenticated: true });
  };

  removeAuth = () => {
    this.setState({ authenticated: false });
    console.log("remove Auth");
  };

  render() {
    const {
      authenticated,
      name,
      email,
      sub,
      message,
      users,
      closed,
      noEmailButton
    } = this.state;

    console.log("App", authenticated);

    return (
      <div>
        <Nav authenticated={authenticated} onHandleLogout={this.removeAuth} />
        <Switch>
          <Route
            exact
            path="/login"
            render={props =>
              authenticated ? (
                <Redirect to="/dashboard" />
              ) : (
                <Login
                  {...props}
                  authenticated={authenticated}
                  onHandleAuth={this.setAuth}
                />
              )
            }
          />
          <ProtectedRoute
            authenticated={authenticated}
            exact
            path="/dashboard"
            render={props => (
              <Dashboard
                authenticated={authenticated}
                users={users}
                name={name}
                email={email}
                sub={sub}
                message={message}
                onHandleChange={this.handleChange}
                onHandleSend={this.handleSend}
                closed={closed}
                onRef={ref => (this.upload = ref)}
                onHandleUpload={this.handleUpload}
                noEmailButton={noEmailButton}
                onHandleEmailButton={this.handleEmailButton}
                onHandleBack={this.handleBack}
                onHandleClose={this.handleClose}
                onHandleMessage={this.handleMessage}
                {...props}
              />
            )}
          />
          />
          <Route
            path="/register"
            exact
            render={props =>
              authenticated ? (
                <Redirect to="dashboard" />
              ) : (
                <SignUp
                  {...props}
                  authenticated={authenticated}
                  onHandleAuth={this.setAuth}
                />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
