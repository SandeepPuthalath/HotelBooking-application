import { Spinner } from "@material-tailwind/react";
import React from "react";

const Loading = () => {
  return (
    <div className="bg-black bg-opacity-50  backdrop-filter backdrop-blur-sm absolute z-50 top-0 left-0 w-full h-full flex justify-center items-center">
      <Spinner className="h-16 w-16 text-blue-500/10" />;
    </div>
  );
};

export default Loading;
