import { useEffect } from "react";
import { router } from "../routes/Routes";

import { useAuth } from "../store/AuthContext";
import { Outlet } from "@tanstack/react-router";

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user) {
      router.navigate({ to: "/login", search: { from: "protected" } });
    }
  }, [user, loading]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return <Outlet />;
}
