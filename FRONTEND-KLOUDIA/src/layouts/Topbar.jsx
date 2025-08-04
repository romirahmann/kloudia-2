/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaSearch, FaBell, FaEnvelope, FaUser } from "react-icons/fa";
import { useDarkMode } from "../store/ThemeContext";
import { MdOutlineDarkMode, MdOutlineWbSunny } from "react-icons/md";
import { useAuth } from "../store/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { useAlert } from "../store/AlertContext";
import { useSearch } from "../store/QuerySearchContext";

export function TopBar({ onToggleSidebar }) {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const wrapperRef = useRef(null);
  const { theme, toggleTheme } = useDarkMode();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { searchQuery, onChangeSearch } = useSearch();
  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpenUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    console.log(searchQuery);
  }, [searchQuery]);

  const handleLogout = () => {
    logout();
    showAlert("Logout successful", "success");
    navigate({ to: "/login" });
  };

  return (
    <header className="bg-white dark:bg-gray-900 flex items-center justify-between p-4 shadow border-b relative">
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
        <div className="relative">
          <input
            type="text"
            placeholder="Search anything..."
            onChange={onChangeSearch}
            className="ps-10 py-2 border border-primary rounded-md text-sm bg-gray-100"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>

        <button
          onClick={toggleTheme}
          className="darkMode px-2 py-2 border border-primary dark:text-white dark:border-white rounded-md mx-5 text-xl"
        >
          {theme === "dark" ? <MdOutlineDarkMode /> : <MdOutlineWbSunny />}
        </button>

        {/* Avatar + Dropdown Menu wrapper */}
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
                  <p className="font-semibold">Romi Rahman</p>
                  <p className="text-xs text-gray-500">romi@example.com</p>
                </div>
                <button
                  onClick={() => handleLogout()}
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
  );
}
