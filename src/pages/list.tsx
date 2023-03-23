import { GetBannerImage } from '@/lib/components/GetBannerImage';
import AnimeMangaSwitch from '@/lib/components/Home/AnimeMangaSwitch';
import ListCategory from '@/lib/components/List/ListCategory';
import StatusSelector from '@/lib/components/List/StatusSelector';
import Navbar from '@/lib/components/Navbar';
import { inProgress } from '@/lib/graphql/query/inProgress';
import { useState } from 'react';

export default function List() {
  const [type, setType] = useState('ANIME');
  const [status, setStatus] = useState('ALL');
  return (
    <div>
      <AnimeMangaSwitch type={type} setType={setType} />
      <StatusSelector type={type} status={status} setStatus={setStatus} />

      <div className="flex flex-col mb-5">
        <Navbar />
        <GetBannerImage />
        <div className="flex flex-col ml-24 mr-4 mt-2">
          {status === 'ALL' || status === 'CURRENT' ? (
            <ListCategory
              query={inProgress}
              type={type}
              status="CURRENT"
              title={type === 'ANIME' ? 'WATCHING' : 'READING'}
            />
          ) : null}
          {status === 'ALL' || status === 'PAUSED' ? (
            <ListCategory
              query={inProgress}
              type={type}
              status="PAUSED"
              title="PAUSED"
            />
          ) : null}
          {status === 'ALL' || status === 'DROPPED' ? (
            <ListCategory
              query={inProgress}
              type={type}
              status="DROPPED"
              title="DROPPED"
            />
          ) : null}
          {status === 'ALL' || status === 'PLANNING' ? (
            <ListCategory
              query={inProgress}
              type={type}
              status="PLANNING"
              title="PLANNING"
            />
          ) : null}
          {status === 'ALL' || status === 'COMPLETED' ? (
            <ListCategory
              query={inProgress}
              type={type}
              status="COMPLETED"
              title="COMPLETED"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
