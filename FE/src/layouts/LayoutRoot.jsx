/* eslint-disable no-unused-vars */
import { Outlet } from "@tanstack/react-router";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useTitle } from "../store/TitleContext";
import { Footer } from "./Footer";

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
    <div className="h-screen bg-gray-300 w-screen overflow-hidden flex">
      <Sidebar
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        changeTitle={(data) => updateTitle(data)}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          titleData={titleData}
        />
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
        <footer className="bg-gray-900 text-gray-800 py-1 z-40">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
