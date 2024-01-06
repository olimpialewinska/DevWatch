import { LogOut } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function LogoutButton() {
  return (
    <Button variant="outline" size="icon" className="min-w-[40px]" asChild>
      <Link to="/">
        <LogOut size={20} />
      </Link>
    </Button>
  );
}
