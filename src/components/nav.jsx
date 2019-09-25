import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ authenticated }) => {
  return (
    <div className="nav">
      <div className="routes">
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
