import React from "react";
import { useAuth } from "../authorization/auth";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }) {
  let location = useLocation();
  let auth = useAuth();

  if (!auth.user) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  return children;
}

export default RequireAuth;
