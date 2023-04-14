import React from 'react';
import Navbar from '../Navbar';

export default function SeasonalSkeleton() {
  return (
    <div>
      <Navbar />
      <div>
        <div className="w-screen h-32 bg-neutral-700 animate-pulse"></div>
      </div>
      <div className="ml-24 flex gap-4 h-full ">
        <div className="flex flex-col gap-3 mt-11">
          <div className="w-40 h-3 rounded bg-neutral-900 animate-pulse"></div>
          {[...Array(3)].map((x, index) => (
            <div
              key={index}
              className="w-64 rounded h-32 bg-neutral-900 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="w-screen bg-neutral-900 p-2">
          <div className="w-full h-24 rounded bg-neutral-800 animate-pulse"></div>
          <div className="mt-2 flex flex-col gap-2">
            <div className=" w-56 h-2 rounded-full bg-neutral-800 animate-pulse"></div>
            <div className=" w-40 h-2 rounded-full bg-neutral-800 animate-pulse"></div>
          </div>
          <div className="mt-14 flex flex-col gap-2">
            <div className=" w-32 h-2 rounded-full bg-neutral-800 animate-pulse"></div>
            <div className=" w-96 h-2 rounded-full bg-neutral-800 animate-pulse"></div>
            <div className=" w-96 h-2 rounded-full bg-neutral-800 animate-pulse"></div>
            <div className=" w-96 h-2 rounded-full bg-neutral-800 animate-pulse"></div>
            <div className=" w-96 h-2 rounded-full bg-neutral-800 animate-pulse"></div>
            <div className=" w-96 h-2 rounded-full bg-neutral-800 animate-pulse"></div>
          </div>
          <div className="mt-10 flex flex-col gap-2">
            <div className=" w-28 h-2 rounded-full bg-neutral-800 animate-pulse"></div>
            <div className="w-full h-56 rounded bg-neutral-800 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
