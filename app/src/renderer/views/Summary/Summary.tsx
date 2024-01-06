import React, { FC } from "react";
import Header from "./Header";

const Summary: FC = () => {
  return (
    <div className="w-full p-6 flex flex-col gap-6 items-center pt-0">
      <Header />
    </div>
  );
};

export default Summary;
