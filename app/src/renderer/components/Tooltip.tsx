import React from "react";
import {
  TooltipProvider,
  Tooltip as T,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";

interface Props {
  children: React.ReactNode;
  text: string;
}

const Tooltip = ({ children, text }: Props) => {
  return (
    <TooltipProvider>
      <T>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{text}</TooltipContent>
      </T>
    </TooltipProvider>
  );
};

export default Tooltip;
