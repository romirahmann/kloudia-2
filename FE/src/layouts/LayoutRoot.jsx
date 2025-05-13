import { Outlet } from "@tanstack/react-router";

export function LayoutRoot() {
  return (
    <>
      <h1>LAYOUT ROOT</h1>
      <Outlet />
    </>
  );
}
