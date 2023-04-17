import React from 'react';
import Navbar from '../../layouts/Navbar';

export default function NotificationsSkeleton() {
  return (
    <div>
      <Navbar />
      <div className="w-screen h-32 bg-neutral-700 animate-pulse"></div>
      <div className="mt-5 ml-24">
        <div className=" w-48 h-3 bg-neutral-900 animate-pulse rounded-full"></div>
      </div>
      <div className="mt-5 ml-24 flex flex-col gap-2">
        {[...Array(6)].map((x, index) => (
          <div
            key={index}
            className="w-[46.5em] rounded h-16 bg-neutral-900 animate-pulse "
          ></div>
        ))}
      </div>
    </div>
  );
}
