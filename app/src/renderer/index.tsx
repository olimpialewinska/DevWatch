import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import "./index.css";
import "./i18n/i18n";
import Login from "./views/Login/Login";
import { App } from "./App";
import Dashboard from "./views/Dashboard";
import { URLS } from "./constants/urls";
import Counter from "./views/Counter";
import Summary from "./views/Summary";
import History from "./views/History";
import UserSettings from "./views/Settings";
import { Main } from "./Main";
import HistoryDetails from "./views/HistoryDetails";

const router = createHashRouter([
  {
    path: "",
    element: <Main />,
    children: [
      {
        path: "",
        element: <App />,
        children: [
          {
            path: "/",
            element: <Login />,
          },
          {
            path: URLS.DASHBOARD,
            element: <Dashboard />,
          },
          {
            path: URLS.COUNTER,
            element: <Counter />,
          },
          {
            path: URLS.HISTORY,
            element: <History />,
          },
          {
            path: URLS.USER_SETTINGS,
            element: <UserSettings />,
          },
          {
            path: `${URLS.HISTORY_DETAILS}/:historyId/:date`,
            element: <HistoryDetails />,
          },
        ],
      },
      {
        path: URLS.SUMMARY,
        element: <Summary />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
