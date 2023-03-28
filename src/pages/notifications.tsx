import { GetBannerImage } from '@/lib/components/GetBannerImage';
import Navbar from '@/lib/components/Navbar';
import { Notification } from '@/lib/graphql/query/notification';
import { useState } from 'react';
import { useQuery } from 'urql';

export default function Notifications() {
  const [hoverBackground, setHoverBackground] = useState('');

  const [result] = useQuery({
    query: Notification,
    // variables: variables,
  });
  const { data, fetching, error } = result;
  console.log(data);

  if (fetching) return <div>fetching</div>;
  if (error) return <div>error</div>;

  return (
    <div>
      <div className="flex flex-col mb-5">
        <Navbar />
        <GetBannerImage hoverBackground={hoverBackground} />
        <div className="flex flex-col ml-24 mr-4 mt-4 gap-4">
          <span className="font-semibold text-sm">NOTIFICATIONS</span>

          <div className="flex flex-col gap-4">
            {data.Page.notifications.map((notif) => {
              // if [].includes(notif.type) return <comp />
              return <div key={notif.createdAt}>{notif.createdAt}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
