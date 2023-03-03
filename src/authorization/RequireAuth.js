import React from "react";
import { useAuth } from "../authorization/auth";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const auth = useAuth();
  console.log(auth.user);

  if (!auth.user) {
    return <Navigate to={"/login"} />;
  }
  return children;
}

export default RequireAuth;
