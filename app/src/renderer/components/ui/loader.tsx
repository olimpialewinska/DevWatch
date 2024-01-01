import { FC } from "react";
import { Loader as L } from "lucide-react";
import { cn } from "@/renderer/lib/utils";
import React from "react";

interface LoaderProps {
  className?: string;
  size?: number;
  color?: string;
}

const Loader: FC<LoaderProps> = ({
  className,
  size = 32,
  color = "hsl(var(--background))",
}) => {
  return (
    <L className={cn("animate-spin", className)} size={size} color={color} />
  );
};

export default Loader;
