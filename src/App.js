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
    console.log(users);
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
    let users = [...this.state.users, { name, sub, email, message }];
    this.setState({ name: "", sub: "", email: "", message: "", users });
    this.writeData(name, email, sub, message);
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

  render() {
    const { name, email, sub, message, users, closed } = this.state;
    const { user, signOut, signInWithGoogle } = this.props;
    return (
      <div>
        {user ? (
          <div>
            <Users users={users} />
            <ChatBox
              name={name}
              email={email}
              sub={sub}
              message={message}
              onHandleChange={this.handleChange}
              onHandleSend={this.handleSend}
              closed={closed}
            />
            <ChatButton
              closed={closed}
              onHandleClose={this.handleClose}
              onHandleMessage={this.handleMessage}
            />
          </div>
        ) : (
          <div className="sign-in">
            <p>Please Sign in</p>
            <button onClick={signInWithGoogle}>Sign in With Google</button>
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
