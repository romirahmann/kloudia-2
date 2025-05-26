/* eslint-disable no-unused-vars */
import {
  createRootRoute,
  createRouter,
  createRoute,
} from "@tanstack/react-router";
import { LayoutRoot } from "../layouts/LayoutRoot";
import { Login } from "../pages/auth/Login";
import { ErrorPage } from "../pages/ErrorPage";
import { ProtectedRoute } from "../components/ProtectedRoutes";
import { Userpage } from "../pages/Userpage";
import { DashboardPage } from "../pages/DashboardPage";
import { CabinetPage } from "../pages/CabinetPage";
import { TenantPage } from "../pages/TenantPage";
import { GroupPage } from "../pages/GroupPage";
import { ClassificationPage } from "../pages/ClassificationPage";

// 1. Buat root route
const rootRoute = createRootRoute();

const protectedLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected-layout",
  component: ProtectedRoute,
});
// 2. Buat layout route (misalnya layout utama untuk halaman dalam login)
const layoutRoute = createRoute({
  getParentRoute: () => protectedLayout,
  id: "layout-root",
  component: LayoutRoot,
});

// 3. Daftar halaman di bawah layoutRoute
const layoutChildrenRoutes = [
  {
    path: "/",
    component: DashboardPage,
  },
  {
    path: "/cabinets",
    component: CabinetPage,
  },
  {
    path: "/classifications",
    component: ClassificationPage,
  },
  {
    path: "/tenants",
    component: TenantPage,
  },
  {
    path: "/groups",
    component: GroupPage,
  },
  {
    path: "/users",
    component: Userpage,
  },
].map(({ path, component }) =>
  createRoute({
    getParentRoute: () => layoutRoute,
    path,
    component,
  })
);

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: ErrorPage,
});

const login = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

// 4. Tambahkan semua routes ke dalam rootRoute
const routeTree = rootRoute.addChildren([
  protectedLayout.addChildren([layoutRoute.addChildren(layoutChildrenRoutes)]),
  login,
  notFoundRoute,
]);

// 5. Export router
export const router = createRouter({
  routeTree,
});
