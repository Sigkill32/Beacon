import React from "react";
import { Link } from "react-router-dom";
import Logout from "./logout";

const Nav = ({ authenticated, onHandleLogout }) => {
  return (
    <div className="nav">
      <div className="routes">
        <Logout onHandleLogout={onHandleLogout} />
        {authenticated ? (
          <div>
            <Link to="/dashboard">DashBoard</Link>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
