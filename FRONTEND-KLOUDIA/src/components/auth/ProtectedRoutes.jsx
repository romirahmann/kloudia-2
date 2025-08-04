import { Outlet, Navigate } from "@tanstack/react-router";
import { useAuth } from "../../store/AuthContext";

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" search={{ from: "protected" }} />;
  }

  return <Outlet />;
}
