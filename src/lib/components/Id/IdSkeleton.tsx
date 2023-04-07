import React from 'react';
import Navbar from '../Navbar';

export default function IdSkeleton() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="absolute ml-24 mt-10 flex flex-col gap-2">
          <div className=" w-40 h-60 bg-neutral-600 animate-pulse"></div>
          <div className="flex  justify-between">
            <div className=" w-[7.5em] h-7 bg-neutral-600 animate-pulse rounded"></div>
            <div className=" w-7 h-7 bg-neutral-600 animate-pulse rounded"></div>
          </div>
        </div>
        <div className="absolute ml-[18em] mt-[11.5em] flex flex-col gap-6">
          <div className=" w-60 h-3 bg-neutral-600 animate-pulse rounded-full"></div>
          <div className="flex flex-col gap-3">
            <div className=" w-96 h-2 bg-neutral-600 animate-pulse rounded-full"></div>
            <div className=" w-96 h-2 bg-neutral-600 animate-pulse rounded-full"></div>
            <div className=" w-96 h-2 bg-neutral-600 animate-pulse rounded-full"></div>
            <div className=" w-96 h-2 bg-neutral-600 animate-pulse rounded-full"></div>
          </div>
        </div>
      </div>
      <div>
        <div className="w-screen h-32 bg-neutral-700 animate-pulse"></div>
        <div className="w-screen h-52 bg-neutral-900 animate-pulse"></div>
      </div>
      <div className="flex gap-4">
        <div className="ml-24 mt-7">
          <div className="w-40 h-[30em] rounded bg-neutral-900 animate-pulse"></div>
        </div>
        <div>
          <div className="flex flex-col gap-2 mt-7">
            <div className=" w-40 h-2 bg-neutral-900 animate-pulse rounded-full"></div>
            <div className="flex gap-3">
              {[...Array(3)].map((x, index) => (
                <div
                  key={index}
                  className="w-[12.5em] rounded h-20 bg-neutral-900 animate-pulse "
                ></div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-6">
            <div className=" w-40 h-2 bg-neutral-900 animate-pulse rounded-full"></div>
            <div className="flex gap-3">
              {[...Array(3)].map((x, index) => (
                <div
                  key={index}
                  className="w-[12.5em] rounded h-20 bg-neutral-900 animate-pulse "
                ></div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-6">
            <div className=" w-40 h-2 bg-neutral-900 animate-pulse rounded-full"></div>
            <div className="flex gap-3 flex-wrap">
              {[...Array(6)].map((x, index) => (
                <div
                  key={index}
                  className="w-[12.5em] rounded h-20 bg-neutral-900 animate-pulse "
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
