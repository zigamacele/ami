import React from 'react';

export default function Top100Skeleton() {
  return (
    <div className="ml-24 mt-6 flex flex-col rounded-full gap-2 fade-in-fast">
      <div className="flex justify-between">
        <div className="w-32 h-2.5 bg-neutral-900 rounded-full animate-pulse"></div>
        <div className="w-20 h-2.5 bg-neutral-900 rounded-full animate-pulse"></div>
      </div>
      <div className="flex flex-col gap-2">
        {[...Array(10)].map((x, index) => (
          <div key={index} className="flex items-center gap-3.5">
            <div className="rounded h-20 w-full bg-neutral-900 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
