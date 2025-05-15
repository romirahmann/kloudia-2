import { useEffect } from "react";

export function AlertMessage({ message, onClose, type = "warning" }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // otomatis hilang setelah 3 detik
    return () => clearTimeout(timer);
  }, [onClose]);

  const color = {
    success: "bg-green-100 text-green-800 border-green-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
    error: "bg-red-100 text-red-800 border-red-300",
  }[type];

  return (
    <div
      className={`fixed top-5 right-52 z-50 border-l-4 p-4 rounded shadow-md ${color}`}
      role="alert"
    >
      <p className="text-sm font-semibold">{message}</p>
    </div>
  );
}
