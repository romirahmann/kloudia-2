/* eslint-disable no-unused-vars */

import { AnimatePresence, motion } from "framer-motion";
import { MdBlock } from "react-icons/md";
import { Button } from "./Button";

export function NonactiveComponent({ onNonaktif, onClose }) {
  const handleNonaktif = async () => {
    onNonaktif();
  };

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
            <MdBlock />
          </motion.div>
        </AnimatePresence>
        <h1 className="text-center text-gray-800 dark:text-gray-200 my-10">
          Are you sure for nonaktif this data ?
        </h1>
        <div className="btn flex justify-end gap-2">
          <Button
            onClick={onClose}
            className="bg-transparent border border-gray-500 rounded-md text-gray-900 px-4 py-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleNonaktif}
            className="bg-yellow-700 px-4 py-1 hover:bg-red-600 rounded-md text-white"
          >
            Nonaktif
          </Button>
        </div>
      </div>
    </>
  );
}
