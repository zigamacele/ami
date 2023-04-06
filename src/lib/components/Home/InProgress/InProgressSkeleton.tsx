import React from 'react';

export default function InProgressSkeleton() {
  return (
    <div className=" mt-6 flex flex-col rounded-full gap-2 fade-in-fast">
      <div className="self-end w-32 h-2.5 bg-neutral-900 rounded-full animate-pulse "></div>
      <div className="flex flex-col gap-2">
        {[...Array(5)].map((x, index) => (
          <div
            key={index}
            className="w-[13.5em] rounded h-20 bg-neutral-900 animate-pulse "
          ></div>
        ))}
      </div>
    </div>
  );
}
