/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Outlet } from "@tanstack/react-router";
import { Sidebar, SidebarDetail } from "./Sidebar";
import { TopBar } from "./Topbar";
import { Footer } from "./Footer";
import { AnimatePresence, motion } from "framer-motion";

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectMenu, setSelectMenu] = useState("Dashboard");

  const handleSelectedMenu = (menu) => {
    setCollapsed(false);
    setSelectMenu(menu);
  };

  return (
    <div className="flex h-screen  w-full overflow-hidden">
      <Sidebar selectMenu={(menu) => handleSelectedMenu(menu)} />

      {/* Animate Sidebar Detail */}
      <AnimatePresence mode="wait">
        {!collapsed && (
          <motion.div
            key="sidebar-detail"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 200, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "tween", duration: 0.3 }}
            className="overflow-hidden "
          >
            <SidebarDetail selectedMenu={selectMenu} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden bg-[#f8fafc]">
        <TopBar onToggleSidebar={() => setCollapsed(!collapsed)} />
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
        <div className="max-w-full bg-gray-800">
          <Footer />
        </div>
      </div>
    </div>
  );
}
