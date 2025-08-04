/* eslint-disable no-unused-vars */
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { PageNotFound } from "../pages/Error/PageNotFound";
import { ProtectedRoute } from "../components/auth/ProtectedRoutes";
import { LoginPage } from "../pages/auth/LoginPage";
import { MainLayout } from "../layouts/MainLayout";
import { DashboardPage } from "../pages/main/DashboardPage";

const rootRoute = createRootRoute();

const protectedLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected-layout",
  component: ProtectedRoute,
});

const loginPage = createRoute({
  getParentRoute: () => rootRoute,
  path: "login",
  component: LoginPage,
});

const mainLayout = createRoute({
  getParentRoute: () => protectedLayout,
  id: "main-layout",
  component: MainLayout,
});

const dashboardPage = createRoute({
  getParentRoute: () => mainLayout,
  path: "/",
  component: DashboardPage,
});

const routeTree = rootRoute.addChildren([
  protectedLayout,
  loginPage,
  mainLayout.addChildren([dashboardPage]),
]);

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: PageNotFound,
});
