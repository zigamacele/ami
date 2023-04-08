import { deleteMedia } from '@/lib/graphql/query/mutations/deleteMedia';
import { editMedia } from '@/lib/graphql/query/mutations/editMedia';
import {
  humanStatus,
  mediaDate,
  mediaStatus,
  progressType,
  scoreFormat,
  ScoreFormat,
} from '@/lib/helpers/anilistResponse';
import { inputsTheme } from '@/lib/theme/MUI';
import { ThemeProvider } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from 'urql';

export default function Inputs({
  refresh,
  media,
  setShowPopup,
}: {
  media: any;
  refresh: Function;
  setShowPopup: Function;
}) {
  const [editResult, updateEdit] = useMutation(editMedia);
  const [editDelete, updateDelete] = useMutation(deleteMedia);

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
    if (mediaOnViewerList) return mediaDate(media[status]);
    else if (status === 'startedAt') return dayjs();
    else return null;
  }

  const [startDate, setStartDate] = useState<Dayjs | null>(
    checkIfMediaHasDate(media.mediaListEntry, 'startedAt')
  );

  const [endDate, setEndDate] = useState<Dayjs | null>(
    checkIfMediaHasDate(media.mediaListEntry, 'completedAt')
  );

  const viewerScoreFormat =
    typeof window !== 'undefined'
      ? localStorage.getItem('viewerScoreFormat') || 'POINT_100'
      : 'POINT_100';

  const submitEditedMedia = () => {
    const updateStartedAt =
      !media.mediaListEntry ||
      (media.mediaListEntry &&
        !_.isEqual(mediaDate(media.mediaListEntry.startedAt), startDate));

    const updateCompleteddAt =
      !media.mediaListEntry ||
      (media.mediaListEntry &&
        !_.isEqual(mediaDate(media.mediaListEntry.completedAt), endDate));

    const variables = {
      mediaId: media.id,
      status: status,
      progress: progress,
      repeat: rewatch,
      scoreRaw: score,
      ...(updateStartedAt && {
        startedAt: {
          year: dayjs(startDate).year(),
          month: dayjs(startDate).month() + 1,
          day: dayjs(startDate).date(),
        },
      }),
      ...(updateCompleteddAt && {
        completedAt: {
          year: dayjs(endDate).year(),
          month: dayjs(endDate).month() + 1,
          day: dayjs(endDate).date(),
        },
      }),
    };
    const loading = toast.loading('Please wait...');
    updateEdit(variables).then((result) => {
      toast.update(loading, {
        render: `${media.title.romaji} list entry updated`,
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
      setShowPopup(false);
    });
  };

  const submitDeleteMedia = () => {
    if (media.mediaListEntry) {
      const variables = {
        deleteMediaListEntryId: media.mediaListEntry.id,
      };
      const loading = toast.loading('Please wait...');
      updateDelete(variables).then((result) => {
        toast.update(loading, {
          render: `${media.title.romaji} removed from your list`,
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });
        localStorage.setItem('refreshInProgress', 'refresh');
        refresh();
        setShowPopup(false);
      });
    }
  };

  return (
    <section className="flex flex-wrap gap-3">
      <span
        onClick={submitEditedMedia}
        className="absolute top-32 right-2 text-xs bg-neutral-600 hover:bg-neutral-500 px-3 py-1.5 rounded cursor-pointer"
      >
        Done
      </span>
      <span
        onClick={submitDeleteMedia}
        className="absolute right-2 bottom-2 text-xs bg-neutral-900 hover:bg-neutral-700 px-3 py-1.5 rounded cursor-pointer"
      >
        Delete
      </span>
      <ThemeProvider theme={inputsTheme}>
        <div className="flex flex-col gap-5 mt-5 text-xs">
          <div className="flex gap-4">
            <div className="flex flex-col w-48 gap-1">
              <span className="opacity-60">Status</span>
              <Select
                className="bg-neutral-900/80 rounded"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
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
                className="bg-neutral-900/80 rounded"
                id="outlined-basic"
                type="number"
                variant="outlined"
                value={score.toString()}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (value < 0) value = 0;
                  // if (value > 100) value = 100;
                  // limits max value depending on users scoreformat prefrance
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
              <span className="opacity-60">Progress</span>
              <TextField
                className="bg-neutral-900/80 rounded"
                id="outlined-basic"
                type="number"
                value={progress.toString()}
                variant="outlined"
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (value < 0) value = 0;
                  if (
                    media[progressType(media.type)] &&
                    value > media[progressType(media.type)]
                  )
                    value = media[progressType(media.type)];
                  setProgress(value);
                }}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col w-48 gap-1">
              <span className="opacity-60">Start Date</span>
              <DatePicker
                className="bg-neutral-900/80 rounded"
                value={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="flex flex-col w-48 gap-1">
              <span className="opacity-60">End Date</span>
              <DatePicker
                className="bg-neutral-900/80 rounded"
                value={endDate}
                onChange={(date) => {
                  setEndDate(date);
                }}
              />
            </div>
            <div className="flex flex-col w-48 gap-1">
              <span className="opacity-60">Total Rewatches</span>
              <TextField
                className="bg-neutral-900/80 rounded"
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
      </ThemeProvider>
    </section>
  );
}
