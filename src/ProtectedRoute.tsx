import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({
  authenticated,
  isAdmin,
  children,
}: {
  authenticated: boolean;
  isAdmin: boolean | undefined;
  children: JSX.Element;
}) => {
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!isAdmin) {
    return <Navigate to="unauthorized" replace />;
  }

  return children;
};
