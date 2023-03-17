import React from 'react';
import { GetViewer } from './getViewer';

export default function Navbar() {
  return (
    <nav className="h-screen  bg-neutral-900 p-4 w-24">
      <div className="flex justify-center">
        <GetViewer />
      </div>
    </nav>
  );
}
