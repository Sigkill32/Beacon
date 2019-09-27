import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ authenticated, ...rest }) => {
  return <>{authenticated ? <Route {...rest} /> : <Redirect to="/login" />}</>;
};

export default ProtectedRoute;
