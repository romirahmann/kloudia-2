/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { Sidebar, SidebarDetail } from "./Sidebar";
import { TopBar } from "./Topbar";
import { Footer } from "./Footer";
import { AnimatePresence, motion } from "framer-motion";

export function MainLayout() {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(true);
  const [selectMenu, setSelectMenu] = useState(() => {
    return sessionStorage.getItem("selectedMenu") || "Dashboard";
  });
  const [selectedSubmenu, setSelectedSubmenu] = useState(() => {
    return sessionStorage.getItem("selectedSubmenu") || null;
  });

  useEffect(() => {
    sessionStorage.setItem("selectedMenu", selectMenu);
  }, [selectMenu]);

  useEffect(() => {
    if (selectedSubmenu) {
      sessionStorage.setItem("selectedSubmenu", selectedSubmenu);
    } else {
      sessionStorage.removeItem("selectedSubmenu");
    }
  }, [selectedSubmenu]);

  const handleSelectedMenu = (menu) => {
    setSelectMenu(menu);
    setSelectedSubmenu(null);

    if (menu === "Dashboard") {
      navigate({ to: "/" });
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };

  const handleSubMenuSelected = (submenu) => {
    setSelectedSubmenu(submenu);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar selectMenu={handleSelectedMenu} selectedMenu={selectMenu} />

      <AnimatePresence mode="wait">
        {!collapsed && (
          <motion.div
            key="sidebar-detail"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 200, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "tween", duration: 0.3 }}
            className="overflow-hidden"
          >
            <SidebarDetail
              selectedMenu={selectMenu}
              selectedSubmenu={selectedSubmenu}
              onSelectSubmenu={handleSubMenuSelected}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col flex-1 overflow-hidden bg-[#f8fafc]">
        <TopBar
          onToggleSidebar={() => setCollapsed(!collapsed)}
          selectedMenu={selectMenu}
          selectedSubmenu={selectedSubmenu}
        />
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
