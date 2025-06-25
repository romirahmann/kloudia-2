/* eslint-disable no-unused-vars */
import { Outlet } from "@tanstack/react-router";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useTitle } from "../store/TitleContext";

export function LayoutRoot() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [title, setTitle] = useState([]);
  const { titleData, updateTitle } = useTitle();

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
          changeTitle={(data) => updateTitle(data)}
        />
        <div className="flex flex-col flex-1 min-w-0">
          <Topbar
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            titleData={titleData}
          />
          <main className="px-1 py-1 bg-gray-200 dark:bg-gray-900 flex-1 overflow-y-auto overflow-x-hidden  min-w-0">
            <div className="">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
