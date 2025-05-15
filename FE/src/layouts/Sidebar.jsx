/* eslint-disable no-unused-vars */
import { FaChevronLeft } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

export function Sidebar({ isOpen, onToggle }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  if (isMobile) {
    return (
      <>
        <motion.div
          animate={{ width: isOpen ? 200 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-full shadow-md"
        >
          <div
            className={`flex items-center ${
              isOpen ? "py-4 ps-4" : "py-4 px-4"
            }`}
          >
            <img src="/icon/icon-dms.png" className="w-5 lg:w-10" alt="Logo" />
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  key="logo-text"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl lg:text-3xl font-bold ms-2"
                >
                  Kloudia
                </motion.h1>
              )}
            </AnimatePresence>
            <button
              onClick={() => onToggle(!isOpen)}
              className={`${
                isOpen ? "block" : "hidden"
              } ms-auto bg-primary ps-1 py-3 rounded-s-xl text-white text-sm`}
            >
              <FaChevronLeft />
            </button>
          </div>
          <div className="menu  flex flex-col py-5 px-28"></div>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <motion.div
        animate={{ width: isOpen ? 300 : 75 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="h-full shadow-md"
      >
        <div
          className={`flex items-center ${isOpen ? "py-4 ps-4" : "py-4 px-4"}`}
        >
          <img src="/icon/icon-dms.png" className="w-10 h-10" alt="Logo" />
          <AnimatePresence>
            {isOpen && (
              <motion.h1
                key="logo-text"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="text-3xl font-bold ms-2"
              >
                Kloudia
              </motion.h1>
            )}
          </AnimatePresence>
          <button
            onClick={() => onToggle(!isOpen)}
            className={`${
              isOpen ? "block" : "hidden"
            } ms-auto bg-primary ps-1 py-3 rounded-s-xl text-white text-sm`}
          >
            <FaChevronLeft />
          </button>
        </div>
        <div className="menu  flex flex-col py-5 px-28"></div>
      </motion.div>
    </>
  );
}
