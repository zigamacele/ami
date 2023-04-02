import dayjs from 'dayjs';

export const humanStatus = (status: string, type: string) => {
  if (status === 'CURRENT') return type === 'ANIME' ? 'Watching' : 'Reading';
  if (status === 'PLANNING') return 'Planning';
  if (status === 'COMPLETED') return 'Completed';
  if (status === 'DROPPED') return 'Dropped';
  if (status === 'PAUSED') return 'Paused';
  if (status === 'REPEATING') return 'Repeating';
};

export const addedToList = (type: string, status: string) => {
  const mediaType = type === 'ANIME' ? 'watch' : 'read';
  if (status === 'CURRENT') return `${mediaType}ing list`;
  if (status === 'PLANNING') return `planning list`;
  if (status === 'COMPLETED') return 'completed list';
};

export const addedToFavorites = (title: string, favorite: boolean) => {
  return `${title} ${!favorite ? 'added to' : 'removed from'} favorites`;
};

export const progressType = (type: string) => {
  return type === 'ANIME' ? 'episodes' : 'chapters';
};

interface mediaDate {
  day: number;
  month: number;
  year: number;
}

export const mediaDate = (data: mediaDate) => {
  if (!data.day) return null;
  if (!data.month) return null;
  if (!data.year) return null;
  return dayjs(`${data.year}-${data.month}-${data.day}`);
};

export const mediaStatus = [
  'CURRENT',
  'PLANNING',
  'COMPLETED',
  'DROPPED',
  'PAUSED',
];
export const filteredStatus = (status: string) => {
  return mediaStatus.filter((element) => element !== status);
};

export type ScoreFormat =
  | 'POINT_100'
  | 'POINT_10_DECIMAL'
  | 'POINT_10'
  | 'POINT_5'
  | 'POINT_3';

export const scoreFormat: Record<ScoreFormat, number> = {
  POINT_100: 100,
  POINT_10_DECIMAL: 10,
  POINT_10: 10,
  POINT_5: 5,
  POINT_3: 3,
};

export const humanFormat = (format: string) => {
  if (format === 'TV_SHORT') return 'TV Short';
  if (format === 'MOVIE') return 'Movie';
  if (format === 'SPECIAL') return 'Special';
  if (format === 'MUSIC') return 'Music';
  if (format === 'MANGA') return 'Manga';
  if (format === 'NOVEL') return 'Novel';
  if (format === 'ONE_SHOT') return 'One Shot';
  return format;
};
