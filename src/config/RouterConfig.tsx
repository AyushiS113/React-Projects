import React from "react";
import { useRoutes } from "react-router-dom";
import ModuleWrap from "../components/ModuleWrap";

import AuthLayout from "../views/layouts/AuthLayout";
import MainLayout from "../views/layouts/MainLayout";

import Login from "../views/modules/Auth/Login";
import PageNotFound from "../views/errors/PageNotFound";

import Dashboard from "../views/modules/Dashboard/Dashboard";
import UserManagement from "../views/modules/UserManagement";
import RoleManagement from "../views/modules/RoleManagement";
import ResetPassword from "../views/modules/Auth/ResetPassword";
import ForgotPassword from "../views/modules/Auth/ForgotPassword";

export default function Router() {
  return useRoutes(RouterConfig);
}

export const RouterConfig = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
			{
				path: "/forgot-password",
				element: <ForgotPassword />,
			},
			{
				path: "/reset/:otp",
				element: <ResetPassword />,
			},
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <ModuleWrap module={Dashboard} permission={""} />,
      },
      {
        path: "/users",
        element: <ModuleWrap module={UserManagement} permission={""} />,
      },
      {
        path: "/roles",
        element: <ModuleWrap module={RoleManagement} permission={""} />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];
