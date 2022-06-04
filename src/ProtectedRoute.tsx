import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useCurrentUser from "./hooks/useCurrentUser";

export const ProtectedRoute = ({
  redirectPath = "/login",
  children,
}: {
  redirectPath?: string;
  children: JSX.Element;
}) => {
  const { authenticated, isAdmin, isLoading, getCurrentUser } =
    useCurrentUser();
  const [isAuthorized, setIsAuthorized] = useState<boolean | undefined>(
    authenticated && isAdmin
  );

  useEffect(() => {
    return setIsAuthorized(authenticated && isAdmin);
  }, [getCurrentUser, authenticated, isAdmin, isLoading]);

  if (isLoading) return <div>Loading</div>;

  if (!isAuthorized) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
