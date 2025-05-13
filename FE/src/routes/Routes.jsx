/* eslint-disable no-unused-vars */
import {
  createRootRoute,
  createRouter,
  createRoute,
} from "@tanstack/react-router";
import { LayoutRoot } from "../layouts/LayoutRoot";

// 1. Buat root route
const rootRoute = createRootRoute();

// 2. Buat layout route (misalnya layout utama untuk halaman dalam login)
const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "layout-root",
  component: LayoutRoot,
});

// 3. Daftar halaman di bawah layoutRoute
const layoutChildrenRoutes = [
  {
    path: "/",
    component: "",
  },
  {
    path: "/configurations",
    component: "",
  },
].map(({ path, component }) =>
  createRoute({
    getParentRoute: () => layoutRoute,
    path,
    component,
  })
);

// 4. Tambahkan semua routes ke dalam rootRoute
const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren(layoutChildrenRoutes),
]);

// 5. Export router
export const router = createRouter({
  routeTree,
});
