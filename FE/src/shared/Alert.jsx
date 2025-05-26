/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect } from "react";

export function AlertMessage({ message, onClose, type = "warning" }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const color = {
    success: "bg-green-100 text-green-800 border-green-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
    error: "bg-red-100 text-red-800 border-red-300",
  }[type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ x: 100, opacity: 0 }}
      className={`fixed top-2 w-[15em] right-1 z-50 border-l-4 p-4 rounded shadow-md ${color}`}
      role="alert"
    >
      <p className="text-sm font-semibold">{message}</p>
    </motion.div>
  );
}
