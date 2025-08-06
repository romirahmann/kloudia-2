/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaSearch, FaBell, FaUser } from "react-icons/fa";
import { MdOutlineDarkMode, MdOutlineWbSunny } from "react-icons/md";
import { useDarkMode } from "../store/ThemeContext";
import { useAuth } from "../store/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { useAlert } from "../store/AlertContext";
import { useSearch } from "../store/QuerySearchContext";

export function TopBar({ onToggleSidebar, selectedMenu, selectedSubmenu }) {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const wrapperRef = useRef(null);
  const notifRef = useRef(null);

  const { theme, toggleTheme } = useDarkMode();
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { searchQuery, onChangeSearch } = useSearch();

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target) &&
        notifRef.current &&
        !notifRef.current.contains(e.target)
      ) {
        setOpenUserMenu(false);
        setOpenNotif(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    showAlert("Logout successful", "success");
    navigate({ to: "/login" });
  };

  return (
    <div className="flex flex-col">
      <header className="bg-white dark:bg-gray-900 flex items-center justify-between p-4 shadow border-b relative z-10">
        <div className="flex items-center space-x-4">
          <FaBars
            className="cursor-pointer text-gray-600 dark:text-white"
            onClick={onToggleSidebar}
          />
          <div className="font-bold text-xl text-primary dark:text-white">
            Kloudia
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search anything..."
              onChange={onChangeSearch}
              className="ps-10 py-2 border border-primary rounded-md text-sm bg-gray-100"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="darkMode px-2 py-2 border border-primary dark:text-white dark:border-white rounded-md mx-2 text-xl"
          >
            {theme === "dark" ? <MdOutlineDarkMode /> : <MdOutlineWbSunny />}
          </button>

          {/* Notification Bell */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setOpenNotif((prev) => !prev)}
              className="relative focus:outline-none px-2 py-2 border border-primary dark:text-white dark:border-white rounded-md  text-xl"
            >
              <FaBell className="text-xl text-gray-700 dark:text-white" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1">
                3
              </span>
            </button>

            <AnimatePresence>
              {openNotif && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg ring-1 ring-black/5 z-50"
                >
                  <div className="p-4 border-b font-semibold text-gray-800">
                    Notifications
                  </div>
                  <ul className="text-sm max-h-60 overflow-auto">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      📄 New document uploaded
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      ✅ Your approval is needed
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      🔔 System update scheduled
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Avatar */}
          <div ref={wrapperRef} className="relative">
            <button
              onClick={() => setOpenUserMenu((prev) => !prev)}
              className="focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-primary dark:bg-white flex items-center justify-center dark:text-gray-800 text-white">
                <FaUser />
              </div>
            </button>

            <AnimatePresence>
              {openUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black/5 z-50"
                >
                  <div className="px-4 py-3 border-b text-sm text-gray-700">
                    <p className="font-semibold">{user?.fullname || ""}</p>
                    <p className="text-xs text-gray-500">{user?.email || ""}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-100 dark:bg-gray-800 px-6 py-2 text-sm text-gray-700 dark:text-white border-b flex items-center gap-1">
        <span className="font-semibold">{selectedMenu}</span>
        {selectedSubmenu && (
          <>
            <span>/</span>
            <span>{selectedSubmenu}</span>
          </>
        )}
      </div>
    </div>
  );
}
