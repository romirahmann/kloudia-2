/* eslint-disable no-unused-vars */
import { Link } from "@tanstack/react-router";
import { FaHome, FaFileAlt, FaCog, FaSearch } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

export function Sidebar({ selectMenu, selectedMenu }) {
  return (
    <div className="bg-[#0e1d34] text-white w-16 flex flex-col items-center py-4 space-y-4">
      <img src="/icon/icon-dms.png" className="w-10" alt="icon" />
      <div className="btn-menu flex flex-col items-center py-4 space-y-6">
        <button
          onClick={() => selectMenu("Dashboard")}
          className={`p-2 rounded-md transition-all duration-150 ${
            selectedMenu === "Dashboard"
              ? "bg-white text-[#0e1d34]"
              : "hover:bg-white/20"
          }`}
        >
          <FaHome className="text-xl" />
        </button>
        <button
          onClick={() => selectMenu("Search")}
          className={`p-2 rounded-md transition-all duration-150 ${
            selectedMenu === "Search"
              ? "bg-white text-[#0e1d34]"
              : "hover:bg-white/20"
          }`}
        >
          <FaSearch className="text-xl" />
        </button>
        <button
          onClick={() => selectMenu("Documents")}
          className={`p-2 rounded-md transition-all duration-150 ${
            selectedMenu === "Documents"
              ? "bg-white text-[#0e1d34]"
              : "hover:bg-white/20"
          }`}
        >
          <FaFileAlt className="text-xl" />
        </button>
        <button
          onClick={() => selectMenu("Setting")}
          className={`p-2 rounded-md transition-all duration-150 ${
            selectedMenu === "Setting"
              ? "bg-white text-[#0e1d34]"
              : "hover:bg-white/20"
          }`}
        >
          <FaGear className="text-xl" />
        </button>
      </div>
    </div>
  );
}

export function SidebarDetail({
  selectedMenu,
  selectedSubmenu,
  onSelectSubmenu,
}) {
  return (
    <div className="bg-white dark:bg-[#0e1d34] h-screen p-4 text-gray-700 dark:text-white">
      <div className="border-b-2 mt-2">
        <h2 className="text-lg font-semibold mb-4">
          {selectedMenu || "Dashboard"}
        </h2>
      </div>

      {/* Dashboard */}
      {selectedMenu === "Dashboard" && <ul className="space-y-2"></ul>}

      {/* Documents */}
      {selectedMenu === "Documents" && (
        <ul className="space-y-2">
          {["All Docs", "Classification", "Cabinet", "Tenants"].map((item) => (
            <li
              key={item}
              onClick={() => onSelectSubmenu(item)}
              className={`cursor-pointer p-2 rounded-md transition-all duration-150 ${
                selectedSubmenu === item
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-white font-semibold"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {/* Setting */}
      {selectedMenu === "Setting" && (
        <ul className="space-y-2 mt-5">
          <li
            onClick={() => onSelectSubmenu("Groups")}
            className={`cursor-pointer p-2 rounded-md transition-all duration-150 ${
              selectedSubmenu === "Groups"
                ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-white font-semibold"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Link to="/group" className="block w-full h-full">
              Group
            </Link>
          </li>
          <li
            onClick={() => onSelectSubmenu("User")}
            className={`cursor-pointer p-2 rounded-md transition-all duration-150 ${
              selectedSubmenu === "User"
                ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-white font-semibold"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Link to="/user" className="block w-full h-full">
              User
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
