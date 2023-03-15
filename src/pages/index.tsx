import { getCookie } from 'cookies-next';
import React from 'react';

export default function Home() {
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  console.log(getCookie('access_token', ['path', 'expires_in']));
  return (
    <a
      href={`https://anilist.co/api/v2/oauth/authorize?client_id=${CLIENT_ID}&response_type=token`}
    >
      Login with AniList
    </a>
  );
}
