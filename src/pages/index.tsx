import { getCookie, hasCookie } from 'cookies-next';
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
      mediaListOptions {
        scoreFormat
      }
    }
  }
`;

export default function Index() {
  const router = useRouter();
  const checkCookies = getCookie('access_token');

  const [result, reexecuteQuery] = useQuery({
    query: getViewer,
  });

  const refresh = () => {
    reexecuteQuery({ requestPolicy: 'cache-and-network' });
  };

  const { data, fetching, error } = result;

  useEffect(() => {
    if (!checkCookies) router.push('/login');
    if (checkCookies && data) {
      refresh();
      console.log('VIEWER UPDATED');
      localStorage.setItem('viewerName', data.Viewer.name);
      localStorage.setItem('viewerId', data.Viewer.id);
      localStorage.setItem('viewerAvatar', data.Viewer.avatar.large);
      localStorage.setItem('viewerBanner', data.Viewer.bannerImage);
      localStorage.setItem(
        'viewerScoreFormat',
        data.Viewer.mediaListOptions.scoreFormat
      );
      router.push('/home');
    }
  }, [data]);

  if (fetching) return <div className="animate-spin">(￣～￣;)</div>;
}
