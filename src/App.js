import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { db, firebaseApp } from "./config/firebaseConf";
import "./App.css";
import Dashboard from "./components/dashboard";
import Nav from "./components/nav";
import Login from "./components/login";
import SignUp from "./components/signUp";

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
    firebaseApp.auth().onAuthStateChanged(authenticated => {
      authenticated
        ? this.setState(() => ({
            authenticated: true
          }))
        : this.setState(() => ({
            authenticated: false
          }));
    });
  }

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

    return (
      <div>
        <Nav authenticated={authenticated} />
        <Switch>
          <Route
            path="/login"
            render={props => <Login {...props} authenticated={authenticated} />}
          />
          <Route
            path="/register"
            render={props => (
              <SignUp {...props} authenticated={authenticated} />
            )}
          />
          {/* {authenticated ? (
            <Redirect exact from="/login" to="/dashboard" />
          ) : (
            <Redirect from="/dashboard" to="/login" />
          )} */}
          <Route
            path="/dashboard"
            render={
              authenticated
                ? props => (
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
                  )
                : props => <Login {...props} authenticated={authenticated} />
            }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
