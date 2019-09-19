import React, { Component } from "react";
import Users from "./components/users";
import ChatBox from "./components/chatBox";
import ChatButton from "./components/chatButton";
import {
  db,
  firebaseAppAuth,
  providers,
  withFirebaseAuth
} from "./config/firebaseConf";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    name: "",
    sub: "",
    email: "",
    message: "",
    closed: true
  };

  async componentDidMount() {
    await this.getData();
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
    }
  };

  handleSend = () => {
    const { name, sub, email, message } = this.state;
    const result = this.validateForm(name, email, sub, message);
    if (result) {
      let users = [...this.state.users, { name, sub, email, message }];
      this.setState({ name: "", sub: "", email: "", message: "", users });
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
    const isEmailValid = emailRegex.test(email);
    const isNameValid = this.validateStr(name);
    const isSubValid = this.validateStr(sub);
    const isMessageValid = this.validateStr(message);
    console.log(email);
    console.log(isEmailValid, isNameValid);

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

  render() {
    const { name, email, sub, message, users, closed } = this.state;
    const { user, signOut, signInWithGoogle } = this.props;
    return (
      <div>
        {user ? (
          <div>
            <button onClick={signOut} className="sign-out">
              Sign out
            </button>
            <Users users={users} />
            <ChatBox
              name={name}
              email={email}
              sub={sub}
              message={message}
              onHandleChange={this.handleChange}
              onHandleSend={this.handleSend}
              closed={closed}
              onRef={ref => (this.upload = ref)}
              onHandleUpload={this.handleUpload}
            />
            <ChatButton
              closed={closed}
              onHandleClose={this.handleClose}
              onHandleMessage={this.handleMessage}
            />
          </div>
        ) : (
          <div className="sign-in">
            <div>
              <p>Please Sign in to Continue</p>
              <button onClick={signInWithGoogle}>Sign in With Google</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

// export default App;

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);
