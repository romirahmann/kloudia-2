/* eslint-disable no-unused-vars */
import { FaChevronLeft } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { Tooltip } from "react-tooltip";
import { sidebarMenu } from "../data/sidebarMenu";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export function Sidebar({ isOpen, onToggle, changeTitle }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [openSubmenuId, setOpenSubmenuId] = useState(null);
  const navigate = useNavigate();

  const renderMenuItems = () =>
    sidebarMenu.map((item) => {
      const Icon = item.icon;
      const hasChildren = Array.isArray(item.children);
      const isSubmenuOpen = openSubmenuId === item.id;

      return (
        <div className="w-full" key={item.id}>
          {/* BUTTON UTAMA */}
          <button
            onClick={() => {
              if (hasChildren) {
                setOpenSubmenuId(isSubmenuOpen ? null : item.id);
              } else {
                if (isMobile) {
                  onToggle();
                }
                navigate({ to: item.path });
                changeTitle({
                  titlePage: item.titleName,
                  titleDesc: item.titleDesc,
                });
              }
            }}
            className="list-items group flex items-center gap-2 py-2 md:py-3 md:ps-2 dark:text-white font-bold cursor-pointer w-full text-left"
          >
            {/* ICON (bukan button, agar tidak nested) */}
            <span
              onClick={(e) => {
                e.stopPropagation();
                if (!hasChildren) return;
                setOpenSubmenuId(isSubmenuOpen ? null : item.id);
              }}
            >
              <Icon
                data-tooltip-id={`tooltip-${item.id}`}
                data-tooltip-content={item.name}
                className="group-hover:text-primary group-hover:dark:text-white md:text-2xl"
              />
            </span>

            {/* Tooltip jika sidebar tertutup */}
            {!isOpen && (
              <Tooltip
                id={`tooltip-${item.id}`}
                place="right"
                className="z-50"
              />
            )}

            {/* Text animasi jika sidebar terbuka */}
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  key={`menu-text-${item.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 1.5 } }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  className="group-hover:text-primary group-hover:dark:text-white md:text-xl text-sm"
                >
                  {item.name.toUpperCase()}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* SUBMENU */}
          {hasChildren && isSubmenuOpen && isOpen && (
            <div className="pl-9 flex flex-col gap-1">
              {item.children.map((child, index) => (
                <button
                  key={child.id + index}
                  onClick={() => {
                    if (isMobile) {
                      onToggle();
                    }
                    navigate({ to: child.path });
                    changeTitle({
                      titlePage: child.titleName,
                      titleDesc: child.titleDesc,
                    });
                  }}
                  className="text-left text-md py-1 px-2 rounded hover:text-primary font-medium dark:text-white"
                >
                  {child.name}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    });

  // MOBILE
  if (isMobile) {
    return (
      <>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => onToggle(false)}
              className="fixed inset-0 z-[9998] bg-black"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="sidebar-mobile"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 z-[9999] w-72 h-full bg-white dark:bg-gray-950 shadow-lg dark:shadow-gray-900 "
            >
              <div className="flex items-center py-4 ps-4">
                <img src="/icon/icon-dms.png" className="w-6 h-6" alt="Logo" />
                <motion.h1
                  key="logo-text"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl font-bold ms-2 dark:text-white"
                >
                  Kloudia
                </motion.h1>
                <button
                  onClick={() => onToggle(false)}
                  className="ms-auto me-2 bg-primary text-white rounded-full p-2"
                >
                  <FaChevronLeft />
                </button>
              </div>

              <div className="menu flex flex-col p-4">{renderMenuItems()}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // DESKTOP
  return (
    <motion.div
      animate={{ width: isOpen ? "14em" : "4em" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-full dark:shadow-gray-900 dark:bg-gray-950"
    >
      <div
        className={`flex items-center ${isOpen ? "py-3 ps-4" : "py-4 px-4"}`}
      >
        <img src="/icon/icon-dms.png" className="w-7" alt="Logo" />
        <AnimatePresence>
          {isOpen && (
            <motion.h1
              key="logo-text"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="text-3xl font-bold ms-2 dark:text-gray-50"
            >
              Kloudia
            </motion.h1>
          )}
        </AnimatePresence>
        <button
          onClick={() => onToggle(!isOpen)}
          className={`${
            isOpen ? "block" : "hidden"
          } ms-auto bg-primary ps-1 py-3 rounded-s-xl text-white dark:text-gray-50 text-sm`}
        >
          <FaChevronLeft />
        </button>
      </div>
      <hr className="border mt-1 dark:border-gray-900" />
      <div className={`flex items-center ${isOpen ? "py-1" : "py-3"}`}>
        <div className="px-2 w-full">{renderMenuItems()}</div>
      </div>
    </motion.div>
  );
}
