import LinearProgress from '@mui/material/LinearProgress';
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
      options {
        titleLanguage
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
    if (checkCookies && data && !localStorage.getItem('viewerId')) {
      refresh();
      localStorage.setItem('viewerName', data.Viewer.name);
      localStorage.setItem('viewerId', data.Viewer.id);
      localStorage.setItem('viewerAvatar', data.Viewer.avatar.large);
      localStorage.setItem('viewerBanner', data.Viewer.bannerImage);
      localStorage.setItem(
        'viewerTitleLanguage',
        data.Viewer.options.titleLanguage
      );
      localStorage.setItem(
        'viewerScoreFormat',
        data.Viewer.mediaListOptions.scoreFormat
      );
    }
    if (checkCookies && data && localStorage.getItem('viewerId')) {
      refresh();
      console.log('VIEWER UPDATED');

      router.push('/home');
    }
  }, [data]);

  if (fetching)
    return (
      <div className="w-screen">
        <LinearProgress color="inherit" />
      </div>
    );
}
