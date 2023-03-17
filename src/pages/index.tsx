import { hasCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();
  const checkCookies = hasCookie('access_token');

  useEffect(() => {
    checkCookies ? router.push('/home') : router.push('/login');
  }, []);
}
