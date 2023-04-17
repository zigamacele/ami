import { login } from '@/lib/services/auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import logo from '../lib/assets/anilist.svg';

export default function Login() {
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const { asPath } = useRouter();
  const router = useRouter();

  const location =
    typeof window !== 'undefined' && window.location ? window.location : '';

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <button className="flex items-center bg-neutral-900 text-sm text-neutral-200 px-5 py-1 rounded-full gap-2 font-light hover:bg-neutral-700 hover:drop-shadow-lg">
        <Image src={logo} alt="Picture of the author" className="w-6" />
        <a
          onClick={() => console.log('LOCATION', location)}
          href={`https://anilist.co/api/v2/oauth/authorize?client_id=${CLIENT_ID}&response_type=token`}
        >
          Login with AniList
        </a>
      </button>
    </div>
  );
}
