/* eslint-disable no-unused-vars */

import { AnimatePresence, motion } from "framer-motion";

import { FaCheckCircle } from "react-icons/fa";
import { Button } from "./Button";

export function ActivatedComponent({ onActive, onClose }) {
  return (
    <>
      <div className="w-full">
        <AnimatePresence>
          <motion.div
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="icon flex justify-center text-[10em] text-yellow-700"
          >
            <FaCheckCircle />
          </motion.div>
        </AnimatePresence>
        <h1 className="text-center text-gray-800 dark:text-gray-200 my-10">
          Are you sure for nonaktif this data ?{" "}
        </h1>
        <div className="btn flex justify-end gap-2">
          <Button
            onClick={onClose}
            className="px-3 py-2 bg-transparent border border-gray-700 rounded-md text-gray-900"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onActive()}
            className="px-3 py-2 bg-yellow-700 hover:bg-red-600 rounded-md text-white"
          >
            Aktifkan
          </Button>
        </div>
      </div>
    </>
  );
}
