import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import "./i18n/i18n.ts";
import { URLS } from "./constants/urls.ts";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: URLS.HOME,
        element: <Home />,
      },
      {
        path: URLS.LOGIN,
        element: <Login />,
      },
      {
        path: URLS.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: "*",
        element: <div>404</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
