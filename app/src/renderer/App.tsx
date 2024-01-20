import * as React from "react";
import { Toaster } from "./components/ui/toaster";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { ScrollArea } from "./components/ui/scroll-area";
import { FC } from "react";

export const App: FC = () => {
  return (
    <ScrollArea className="h-screen w-full">
      <Navbar />
      <Outlet />
      <Toaster />
    </ScrollArea>
  );
};
