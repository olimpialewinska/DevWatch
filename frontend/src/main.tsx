import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import "./i18n/i18n.ts";
import { URLS } from "./constants/urls.ts";
import Home from "@/pages/Home";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: URLS.HOME,
        element: <Home />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
