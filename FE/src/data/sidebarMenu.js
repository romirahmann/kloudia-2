import { CgHomeAlt } from "react-icons/cg";
import { FaUser, FaFolder, FaCog } from "react-icons/fa";

export const sidebarMenu = [
  {
    id: 1,
    name: "Dashboard",
    icon: CgHomeAlt,
    path: "/",
    titleName: "DASHBOARD",
    titleDesc: "Let's check your update!",
  },
  {
    id: 2,
    name: "Users",
    icon: FaUser,
    path: "/users",
    titleName: "USERSPAGE",
    titleDesc: "Overview of activities",
  },
  {
    id: 3,
    name: "Documents",
    icon: FaFolder,
    path: "/documents",
    titleName: "DOCUMENTS PAGE",
    titleDesc: "Overview of activities",
  },
  {
    id: 4,
    name: "Settings",
    icon: FaCog,
    titleName: "SETTING PAGE",
    titleDesc: "Configure your settings",
    children: [
      {
        id: "4-1",
        name: "users",
        path: "/users",
        titleName: "LIST USERS",
        titleDesc: "User list details",
      },
    ],
  },
];
