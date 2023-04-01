import {
  humanStatus,
  mediaDate,
  mediaStatus,
  scoreFormat,
  ScoreFormat,
} from '@/lib/helpers/anilistResponse';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';

export default function Inputs({ media }: { media: any }) {
  const [status, setStatus] = useState(
    media.mediaListEntry ? media.mediaListEntry.status : 'CURRENT'
  );
  const [score, setScore] = useState(
    checkIfMediaHasAttribute(media.mediaListEntry, 'score')
  );
  const [progress, setProgress] = useState<Number>(
    checkIfMediaHasAttribute(media.mediaListEntry, 'progress')
  );
  const [rewatch, setRewatch] = useState<Number>(
    checkIfMediaHasAttribute(media.mediaListEntry, 'repeat')
  );

  function checkIfMediaHasAttribute(media: any, attribute: string) {
    const mediaOnViewerList = media;
    if (mediaOnViewerList && media[attribute]) return media[attribute];
    else return 0;
  }

  function checkIfMediaHasDate(media: any, status: string) {
    const mediaOnViewerList = media;
    if (mediaOnViewerList && media[status].year)
      return mediaDate(media[status]);
    else return null;
  }

  const [startDate, setStartDate] = useState<Moment | null>(
    checkIfMediaHasDate(media.mediaListEntry, 'startedAt')
  );
  const [endDate, setEndDate] = useState<Moment | null>(
    checkIfMediaHasDate(media.mediaListEntry, 'completedAt')
  );

  const viewerScoreFormat =
    typeof window !== 'undefined'
      ? localStorage.getItem('viewerScoreFormat') || 'POINT_100'
      : 'POINT_100';

  return (
    <section className="flex flex-wrap gap-3">
      <div className="flex flex-col gap-5 mt-5 text-xs">
        <div className="flex gap-4">
          <div className="flex flex-col w-48 gap-1">
            <span className="opacity-60">Status</span>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Age"
              onChange={(e) => setStatus(e.target.value as string)}
            >
              {mediaStatus.map((status) => (
                <MenuItem value={status} key={status}>
                  {humanStatus(status, media.type)}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="flex flex-col w-48 gap-1">
            <span className="opacity-60">Score</span>
            <TextField
              id="outlined-basic"
              type="number"
              variant="outlined"
              value={score.toString()}
              onChange={(e) => {
                let value = Number(e.target.value);
                if (value < 0) value = 0;
                if (
                  viewerScoreFormat !== null &&
                  value > scoreFormat[viewerScoreFormat as ScoreFormat]
                )
                  value = scoreFormat[viewerScoreFormat as ScoreFormat];
                setScore(value);
              }}
            />
          </div>
          <div className="flex flex-col w-48 gap-1">
            <span className="opacity-60">Episode Progress</span>
            <TextField
              id="outlined-basic"
              type="number"
              value={progress.toString()}
              variant="outlined"
              onChange={(e) => {
                let value = Number(e.target.value);
                if (value < 0) value = 0;
                if (media.episodes && value > media.episodes)
                  value = media.episodes;
                setProgress(value);
              }}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col w-48 gap-1">
            <span className="opacity-60">Start Date</span>
            <DatePicker value={startDate} onChange={(e) => setStartDate(e)} />
          </div>
          <div className="flex flex-col w-48 gap-1">
            <span className="opacity-60">End Date</span>
            <DatePicker value={endDate} onChange={(e) => setEndDate(e)} />
          </div>
          <div className="flex flex-col w-48 gap-1">
            <span className="opacity-60">Total Rewatches</span>
            <TextField
              id="outlined-basic"
              value={rewatch.toString()}
              type="number"
              variant="outlined"
              onChange={(e) => {
                let value = Number(e.target.value);
                if (value < 0) value = 0;
                setRewatch(value);
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
