import { GetBannerImage } from '@/lib/layouts/GetBannerImage';
import AnimeMangaSwitch from '@/lib/components/Home/AnimeMangaSwitch';
import ListCategory from '@/lib/components/List/ListCategory';
import StatusSelector from '@/lib/components/List/StatusSelector';
import Navbar from '@/lib/layouts/Navbar';
import { inProgress } from '@/lib/graphql/query/inProgress';
import { useEffect, useState } from 'react';

export default function List() {
  const [type, setType] = useState('ANIME');
  const [status, setStatus] = useState('CURRENT');
  const [hoverBackground, setHoverBackground] = useState('');

  useEffect(() => {
    const listStatus =
      typeof window !== 'undefined'
        ? localStorage.getItem('listStatus') || 'CURRENT'
        : 'CURRENT';

    const viewerType =
      typeof window !== 'undefined'
        ? localStorage.getItem('viewerType') || 'ANIME'
        : 'ANIME';

    setStatus(listStatus);
    setType(viewerType);
  }, []);

  return (
    <div>
      <AnimeMangaSwitch type={type} setType={setType} />
      <StatusSelector type={type} status={status} setStatus={setStatus} />

      <div className="flex flex-col mb-5">
        <Navbar />
        <GetBannerImage hoverBackground={hoverBackground} />
        <div className="flex flex-col ml-24 mr-4 mt-2">
          {status === 'CURRENT' ? (
            <ListCategory
              query={inProgress}
              type={type}
              status="CURRENT"
              title={type === 'ANIME' ? 'WATCHING' : 'READING'}
              setHoverBackground={setHoverBackground}
            />
          ) : null}
          {status === 'PAUSED' ? (
            <ListCategory
              query={inProgress}
              type={type}
              status="PAUSED"
              title="PAUSED"
              setHoverBackground={setHoverBackground}
            />
          ) : null}
          {status === 'DROPPED' ? (
            <ListCategory
              query={inProgress}
              type={type}
              status="DROPPED"
              title="DROPPED"
              setHoverBackground={setHoverBackground}
            />
          ) : null}
          {status === 'PLANNING' ? (
            <ListCategory
              query={inProgress}
              type={type}
              status="PLANNING"
              title="PLANNING"
              setHoverBackground={setHoverBackground}
            />
          ) : null}
          {status === 'COMPLETED' ? (
            <ListCategory
              query={inProgress}
              type={type}
              status="COMPLETED"
              title="COMPLETED"
              setHoverBackground={setHoverBackground}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
