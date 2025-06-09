/* eslint-disable no-unused-vars */
import { FaTrash } from "react-icons/fa6";
import { Button } from "./Button";
import { AnimatePresence, motion } from "framer-motion";

export function DeleteComponent({ onDelete, onClose }) {
  return (
    <>
      <div className="w-full">
        <AnimatePresence>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: [-20, 10, -5, 0], opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="icon flex justify-center text-[10em] text-red-700"
          >
            <FaTrash />
          </motion.div>
        </AnimatePresence>
        <h1 className="text-center text-gray-800 my-10">
          Are you sure for delete this data ?{" "}
        </h1>
        <div className="btn flex justify-end gap-2">
          <Button
            onClick={onClose}
            className="px-4 py-2 bg-transparent border border-gray-700 rounded-md text-gray-900"
          >
            Cancel
          </Button>
          <Button
            onClick={onDelete}
            className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md text-white"
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}
