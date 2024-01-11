import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../contexts/UserContext";
import { Role } from "../utils/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: Role[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { profile } = useContext(UsersContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile || !allowedRoles.includes(profile.role)) {
      navigate("/");
    }
  }, [profile, allowedRoles, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
