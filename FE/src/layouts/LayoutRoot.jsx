/* eslint-disable no-unused-vars */
import { Outlet } from "@tanstack/react-router";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export function LayoutRoot() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [title, setTitle] = useState({
    titlePage: "Dashboard",
    titleDesc: "Let's check your update!",
  });

  const handleChange = (data) => {
    setTitle({
      titlePage: data.titlePage,
      titleDesc: data.titleDesc,
    });
  };

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, []);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          changeTitle={(data) => handleChange(data)}
        />
        <div className="flex flex-col flex-1">
          <Topbar
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            titleData={title}
          />
          <main className="p-10 bg-gray-200 dark:bg-gray-900 flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
