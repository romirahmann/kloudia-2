/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from "react";
import { AlertMessage } from "../shared/AlertMessage";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    message: "",
    type: "success",
    isVisible: false,
  });

  const showAlert = useCallback((message, type = "success") => {
    setAlert({ message, type, isVisible: true });
  }, []);

  const closeAlert = useCallback(() => {
    setAlert((prev) => ({ ...prev, isVisible: false }));
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <AlertMessage
        message={alert.message}
        type={alert.type}
        isVisible={alert.isVisible}
        onClose={closeAlert}
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used within AlertProvider");
  return context;
};
