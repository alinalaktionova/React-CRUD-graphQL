import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ path, token, redirect, children }: any) => {
  return (
    <Route
      path={path}
      render={() =>
        token ? <Redirect to={{ pathname: redirect }} /> : children
      }
    />
  );
};

export default ProtectedRoute;
