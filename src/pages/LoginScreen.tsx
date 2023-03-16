import React from 'react';

export default function LoginScreen() {
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  return (
    <a
      href={`https://anilist.co/api/v2/oauth/authorize?client_id=${CLIENT_ID}&response_type=token`}
    >
      Login with AniList
    </a>
  );
}
