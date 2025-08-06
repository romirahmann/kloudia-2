/* eslint-disable no-unused-vars */
import { Link } from "@tanstack/react-router";
import { FaHome, FaFileAlt, FaCog, FaSearch } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

export function Sidebar({ selectMenu }) {
  return (
    <div className="bg-[#0e1d34]  text-white w-16 flex flex-col items-center py-4 space-y-4">
      <img src="/icon/icon-dms.png" className="w-10" alt="" />
      <div className="btn-menu flex flex-col items-center py-4 space-y-6">
        <button onClick={() => selectMenu("Dashboard")}>
          <FaHome className="text-xl " />
        </button>
        <button onClick={() => selectMenu("Search")}>
          <FaSearch className="text-xl cursor-pointer" />
        </button>
        <button onClick={() => selectMenu("Documents")}>
          <FaFileAlt className="text-xl cursor-pointer" />
        </button>
        <button onClick={() => selectMenu("Setting")}>
          <FaGear className="text-xl cursor-pointer" />
        </button>
      </div>
    </div>
  );
}

export function SidebarDetail({ selectedMenu }) {
  return (
    <div className="bg-white dark:bg-[#0e1d34] h-screen p-4 text-gray-700">
      <div className="border-b-2 mt-2">
        <h2 className="text-lg dark:text-gray-50  font-semibold mb-4">
          {selectedMenu || "Dashboard"}
        </h2>
      </div>
      {/* Dasboard */}
      {selectedMenu === "Dashboard" && <ul className="space-y-2"></ul>}
      {/* Documents */}
      {selectedMenu === "Documents" && (
        <ul className="space-y-2">
          <li className="hover:text-primary cursor-pointer">All Docs</li>
          <li className="hover:text-primary cursor-pointer">Classification</li>
          <li className="hover:text-primary cursor-pointer">Cabinet</li>
          <li className="hover:text-primary cursor-pointer">Tenants</li>
        </ul>
      )}
      {/* Setting */}
      {selectedMenu === "Setting" && (
        <ul className="space-y-2 mt-5">
          <li className="hover:text-primary cursor-pointer bg-purple-500 p-1 rounded-md">
            Groups
          </li>
          <li className="hover:text-primary cursor-pointer">
            <Link to="/setting">User</Link>
          </li>
        </ul>
      )}
    </div>
  );
}
