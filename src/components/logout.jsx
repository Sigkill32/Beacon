import React from "react";
import { firebaseApp } from "../config/firebaseConf";

const logOutUser = () => {
  firebaseApp.auth().signOut();
};

const LogOut = () => {
  return (
    <button onClick={logOutUser} className="sign-out">
      Log out
    </button>
  );
};
export default LogOut;
