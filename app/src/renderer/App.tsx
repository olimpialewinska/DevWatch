import * as React from "react";
import { Toaster } from "./components/ui/toaster";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { ScrollArea } from "./components/ui/scroll-area";
import { FC } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  ArcElement,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  CategoryScale,
  BarController,
  BarElement,
  ArcElement,
  Tooltip
);


export const App: FC = () => {
  return (
    <ScrollArea className="h-screen w-full">
      <Navbar />
      <Outlet />
      <Toaster />
    </ScrollArea>
  );
};
