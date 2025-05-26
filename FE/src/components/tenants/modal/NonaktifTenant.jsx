/* eslint-disable no-unused-vars */
import { MdBlock } from "react-icons/md";
import { Button } from "../../../shared/Button";
import { AnimatePresence, motion } from "framer-motion";
import api from "../../../services/axios.service";

export function NonaktifTenant({ data = [], message, onClose }) {
  const handleNonaktif = async () => {
    try {
      let response = await api.put(`/master/tenant/${data.tenantId}`, {
        isActive: 0,
      });
      // console.log(response.data.data);
      message("Nonaktif Data Successfully!");
      onClose();
    } catch (error) {
      console.log(error);
    }
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
          Are you sure for nonaktif this data ?{" "}
        </h1>
        <div className="btn flex justify-end gap-2">
          <Button
            onClick={onClose}
            style="bg-transparent border border-gray-700 rounded-md text-gray-900"
          >
            Cancel
          </Button>
          <Button
            onClick={handleNonaktif}
            style="bg-yellow-700 hover:bg-red-600 rounded-md text-white"
          >
            Nonaktif
          </Button>
        </div>
      </div>
    </>
  );
}
