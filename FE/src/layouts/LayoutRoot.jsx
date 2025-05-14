/* eslint-disable no-unused-vars */
import { Outlet } from "@tanstack/react-router";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";
import { useState } from "react";

export function LayoutRoot() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
        <div className="flex flex-col flex-1">
          <Topbar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
          <main className="p-10 bg-gray-200 flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
