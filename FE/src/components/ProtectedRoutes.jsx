import { useState } from "react";
import { router } from "../routes/Routes";
import { AlertMessage } from "../shared/Alert";
import { useAuth } from "../store/AuthContext";

export function ProtectedRoute() {
  const { user, loading } = useAuth();
  const [showAlert, setShowAlert] = useState(false);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user) {
    if (!showAlert) {
      setShowAlert(true);
      setTimeout(() => {
        router.navigate({ to: "/login" });
      }, 1500);
    }
    return (
      <>
        {showAlert && (
          <AlertMessage
            message="Silakan login terlebih dahulu!"
            type="warning"
            onClose={() => setShowAlert(false)}
          />
        )}
      </>
    );
  }

  return <Outlet />;
}
