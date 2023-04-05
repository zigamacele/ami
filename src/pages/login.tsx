import Image from 'next/image';
import React from 'react';
import draco from '../../public/draco.png';
import logo from '../lib/assets/anilist.svg';

export default function Login() {
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <button className="flex items-center bg-neutral-900 text-sm text-neutral-200 px-5 py-1 rounded-full gap-2 font-light hover:bg-neutral-700 hover:drop-shadow-lg">
        <Image src={logo} alt="Picture of the author" className="w-6" />
        <a
          href={`https://anilist.co/api/v2/oauth/authorize?client_id=${CLIENT_ID}&response_type=token`}
        >
          Login with AniList
        </a>
      </button>
    </div>
  );
}
