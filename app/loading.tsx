import { SunIcon } from "@heroicons/react/solid";
import React from "react";

const Loading = () => {
  return (
    <div className="bg-gradient-to-br from-sky-800 to-sky-900 min-h-screen flex flex-col items-center justify-center text-slate-500">
      <SunIcon className="h-24 w-24 animate-spin text-yellow-500" />
      <h1 className="text-6xl font-bold text-center mb-10 animate-pulse">
        Loading City Weather Information...
      </h1>
      <h2 className="text-xl font-bold text-center mb-10 animate-pulse">
        Hold on, we are crunching the numbers & generating ana AI summary of
        your requested Weather!
      </h2>
    </div>
  );
};

export default Loading;
