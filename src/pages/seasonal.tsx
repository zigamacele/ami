import { GetBannerImage } from '@/lib/components/GetBannerImage';
import Navbar from '@/lib/components/Navbar';
import Controller from '@/lib/components/Seasonal/Controller';
import FormatSelector from '@/lib/components/Seasonal/FormatSelector';
import MediaList from '@/lib/components/Seasonal/MediaList';
import SeasonalSkeleton from '@/lib/components/Seasonal/SeasonalSkeleton';
import View from '@/lib/components/Seasonal/View';
import { seasonalMedia } from '@/lib/graphql/query/seasonalMedia';
import { currentAnimeSeason } from '@/lib/helpers/moment';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'urql';

export default function Seasonal() {
  const [hoverBackground, setHoverBackground] = useState('');
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [selectedMedia, setSelectedMedia] = useState();
  const [format, setFormat] = useState('TV');

  const variables = {
    season: currentAnimeSeason(currentMonth),
    seasonYear: currentYear,
    format: format,
  };

  const [result, reexecuteQuery] = useQuery({
    query: seasonalMedia,
    variables: variables,
  });

  const refresh = () => {
    setSelectedMedia(undefined);
    reexecuteQuery({ requestPolicy: 'network-only' });
  };

  const { data, fetching, error } = result;

  // useEffect(() => {
  //   if (!selectedMedia && data) setSelectedMedia(data.Page.media[0]);
  // }, [data]);

  if (fetching && !data) return <SeasonalSkeleton />;
  if (error) return <div>error</div>;

  return (
    <div className="flex flex-col relative">
      <Navbar />
      <GetBannerImage hoverBackground={hoverBackground} />
      <FormatSelector format={format} setFormat={setFormat} />
      <div className="flex ml-24 gap-3">
        <div className="flex flex-col">
          <Controller
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            currentYear={currentYear}
            setCurrentYear={setCurrentYear}
          />
          <MediaList
            data={data}
            setHoverBackground={setHoverBackground}
            selectedMedia={selectedMedia}
            setSelectedMedia={setSelectedMedia}
          />
        </div>
        {selectedMedia && <View data={selectedMedia} refresh={refresh} />}
      </div>
    </div>
  );
}
