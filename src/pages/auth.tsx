import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Auth() {
  const router = useRouter();
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substr(1));
    const ACCESS_TOKEN = params.get('access_token');

    setCookie('access_token', ACCESS_TOKEN, {
      path: '/',
      maxAge: 31622400,
    });

    router.push('/');
  }, []);

  return <div>auth</div>;
}
