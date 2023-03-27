import EditMedia from '@/lib/components/EditMedia';
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
  const [hoverBackground, setHoverBackground] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMedia, setPopupMedia] = useState({});

  return (
    <div>
      {showPopup ? (
        <EditMedia setShowPopup={setShowPopup} popupMedia={popupMedia} />
      ) : null}
      <AnimeMangaSwitch type={type} setType={setType} />
      <StatusSelector type={type} status={status} setStatus={setStatus} />

      <div className="flex flex-col mb-5">
        <Navbar />
        <GetBannerImage hoverBackground={hoverBackground} />
        <div className="flex flex-col ml-24 mr-4 mt-2">
          {status === 'ALL' || status === 'CURRENT' ? (
            <ListCategory
              query={inProgress}
              type={type}
              status="CURRENT"
              title={type === 'ANIME' ? 'WATCHING' : 'READING'}
              setHoverBackground={setHoverBackground}
              setShowPopup={setShowPopup}
              setPopupMedia={setPopupMedia}
            />
          ) : null}
          {status === 'ALL' || status === 'PAUSED' ? (
            <ListCategory
              query={inProgress}
              type={type}
              status="PAUSED"
              title="PAUSED"
              setHoverBackground={setHoverBackground}
              setShowPopup={setShowPopup}
              setPopupMedia={setPopupMedia}
            />
          ) : null}
          {status === 'ALL' || status === 'DROPPED' ? (
            <ListCategory
              query={inProgress}
              type={type}
              status="DROPPED"
              title="DROPPED"
              setHoverBackground={setHoverBackground}
              setShowPopup={setShowPopup}
              setPopupMedia={setPopupMedia}
            />
          ) : null}
          {status === 'ALL' || status === 'PLANNING' ? (
            <ListCategory
              query={inProgress}
              type={type}
              status="PLANNING"
              title="PLANNING"
              setHoverBackground={setHoverBackground}
              setShowPopup={setShowPopup}
              setPopupMedia={setPopupMedia}
            />
          ) : null}
          {status === 'ALL' || status === 'COMPLETED' ? (
            <ListCategory
              query={inProgress}
              type={type}
              status="COMPLETED"
              title="COMPLETED"
              setHoverBackground={setHoverBackground}
              setShowPopup={setShowPopup}
              setPopupMedia={setPopupMedia}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
