import React from "react";

const LoaderCards = () => {
  return (
    <div className="grid grid-cols-12 gap-4 mt-5">
      <div className="col-span-4 border-t-8 shadow-xl border-gray-200 p-5 bg-white h-72 animate-pulse rounded"></div>
      <div className="col-span-4 border-t-8 shadow-xl border-gray-200 p-5 bg-white h-72 animate-pulse rounded"></div>
      <div className="col-span-4 border-t-8 shadow-xl border-gray-200 p-5 bg-white h-72 animate-pulse rounded"></div>
    </div>
  );
};

export default LoaderCards;
