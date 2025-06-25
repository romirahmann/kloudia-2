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
import { DocumentsPage } from "../pages/DocumentsPage";
import { AddDocument } from "../components/documents/AddDocument";
import { ViewDocumentPage } from "../pages/ViewDocumentPage";
import { SharedDocument } from "../pages/SharedDocument";

const rootRoute = createRootRoute();

const protectedLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected-layout",
  component: ProtectedRoute,
});

const layoutRoute = createRoute({
  getParentRoute: () => protectedLayout,
  id: "layout-root",
  component: LayoutRoot,
});

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
  path: "setting/groups",
  component: GroupPage,
});

const usersRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "setting/users",
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

const documentRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "documents",
  component: DocumentsPage,
});

const addDocumentRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/documents/add-document",
  component: AddDocument,
  validateSearch: z.object({
    classificationId: z.coerce.number().optional(),
  }),
});
const viewDocumentRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/documents/view-document",
  component: ViewDocumentPage,
  validateSearch: z.object({
    detailId: z.coerce.number().optional(),
  }),
});

const sharedDocumentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/share-document",
  component: SharedDocument,
  validateSearch: z.object({
    query: z.coerce.number().optional(),
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
      documentRoute,
      addDocumentRoute,
      viewDocumentRoute,
    ]),
  ]),
  sharedDocumentRoute,
  loginRoute,
  notFoundRoute,
]);

// 7. Buat router instance
export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: ErrorPage,
});
