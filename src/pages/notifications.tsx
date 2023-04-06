import { GetBannerImage } from '@/lib/components/GetBannerImage';
import Navbar from '@/lib/components/Navbar';
import MediaNotification from '@/lib/components/Notifications/MediaNotification';
import NotificationsSkeleton from '@/lib/components/Notifications/NotificationsSkeleton';
import UserNotification from '@/lib/components/Notifications/UserNotification';
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

  const userNotif = ['ACTIVITY_MESSAGE', 'ACTIVITY_LIKE', 'FOLLOWING'];
  const mediaNotif = ['AIRING', 'RELATED_MEDIA_ADDITION', 'MEDIA_DATA_CHANGE'];

  if (fetching) return <NotificationsSkeleton />;
  if (error) return <div>error</div>;

  return (
    <div>
      <div className="flex flex-col mb-5">
        <Navbar />
        <GetBannerImage hoverBackground={hoverBackground} />
        <div className="flex flex-col ml-24 mr-4 mt-4 gap-4">
          <span className="font-semibold text-sm">NOTIFICATIONS</span>

          <div className="flex flex-col gap-2">
            {data.Page.notifications.map((notif: any) => {
              if (userNotif.includes(notif.type))
                return <UserNotification key={notif.createdAt} notif={notif} />;
              if (mediaNotif.includes(notif.type))
                return (
                  <MediaNotification key={notif.createdAt} notif={notif} />
                );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
