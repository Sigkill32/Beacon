import React, { Component } from "react";
import { firebaseApp } from "../config/firebaseConf";
import { withRouter } from "react-router-dom";

class LogOut extends Component {
  state = {};

  logOutUser = () => {
    const { history, onHandleLogout } = this.props;
    firebaseApp.auth().signOut();
    history.push("/login");
    localStorage.removeItem("token");
    onHandleLogout();
  };

  render() {
    return (
      <button onClick={this.logOutUser} className="sign-out">
        Log out
      </button>
    );
  }
}

export default withRouter(LogOut);
