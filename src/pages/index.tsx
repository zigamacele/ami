import { hasCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { gql, useQuery } from 'urql';

const getViewer = gql`
  query {
    Viewer {
      id
      name
      bannerImage
      avatar {
        large
      }
    }
  }
`;

export default function Index() {
  const router = useRouter();
  const checkCookies = hasCookie('access_token');

  const [result] = useQuery({
    query: getViewer,
  });

  const { data, fetching, error } = result;

  console.log('RESULT', result);
  console.log('DATA', data);

  useEffect(() => {
    if (!checkCookies) router.push('/login');
    if (data && checkCookies) {
      localStorage.setItem('viewerName', data.Viewer.name);
      localStorage.setItem('viewerId', data.Viewer.id);
      localStorage.setItem('viewerAvatar', data.Viewer.avatar.large);
      localStorage.setItem('viewerBanner', data.Viewer.bannerImage);
      router.push('/home');
    }
  }, [data]);

  if (fetching) return <div className="animate-spin">(￣～￣;)</div>;

  // const GetViewer = () => {};
}
