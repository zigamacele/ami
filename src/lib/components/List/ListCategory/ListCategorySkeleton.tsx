import React from 'react';

export default function ListCategorySkeleton({ type }: { type: string }) {
  return (
    <div className="flex flex-col gap-3.5 mt-6">
      <div className="ml-8 w-24 h-2.5 bg-neutral-900 rounded-full animate-pulse "></div>
      <div className="flex flex-col bg-neutral-900 p-2 rounded">
        <div className="flex justify-between p-2 font-medium text-sm">
          <div className="flex gap-1">
            <span className="w-12"></span>
            <div className="w-20 h-2.5 bg-neutral-800 rounded-full animate-pulse "></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-20 h-2.5 bg-neutral-800 rounded-full animate-pulse "></div>
            <div className="w-16 h-2.5 bg-neutral-800 rounded-full animate-pulse "></div>
            {type !== 'MANGA' ? null : (
              <div className="w-16 h-2.5 bg-neutral-800 rounded-full animate-pulse "></div>
            )}
            <div className="w-16 h-2.5 bg-neutral-800 rounded-full animate-pulse "></div>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          {[...Array(7)].map((x, index) => (
            <div
              key={index}
              className="w-full rounded h-12 bg-neutral-800 animate-pulse "
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
