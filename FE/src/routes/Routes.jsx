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
import { z } from "zod";
import { StructurePage } from "../pages/StructurePage";

// 1. Buat root route
const rootRoute = createRootRoute();

// 2. Route untuk layout protected (butuh login)
const protectedLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected-layout",
  component: ProtectedRoute,
});

// 3. Layout utama setelah login
const layoutRoute = createRoute({
  getParentRoute: () => protectedLayout,
  id: "layout-root",
  component: LayoutRoot,
});

// 4. Daftar halaman di bawah layoutRoute secara eksplisit
const dashboardRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/",
  component: DashboardPage,
});

const cabinetsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "cabinets",
  component: CabinetPage,
});

const classificationsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "classifications",
  component: ClassificationPage,
});

const tenantsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "tenants",
  component: TenantPage,
});

const groupsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "groups",
  component: GroupPage,
});

const usersRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "users",
  component: Userpage,
});

const structureRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "structure",
  component: StructurePage,
  validateSearch: z.object({
    classificationId: z.coerce.number().optional(),
  }),
});

// 5. Route login & not found
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: ErrorPage,
});

// 6. Susun pohon route
const routeTree = rootRoute.addChildren([
  protectedLayout.addChildren([
    layoutRoute.addChildren([
      dashboardRoute,
      cabinetsRoute,
      classificationsRoute,
      tenantsRoute,
      groupsRoute,
      usersRoute,
      structureRoute,
    ]),
  ]),
  loginRoute,
  notFoundRoute,
]);

// 7. Buat router instance
export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: ErrorPage,
});
