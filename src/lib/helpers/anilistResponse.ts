export const addedToList = (type: string, status: string) => {
  const mediaType = type === 'ANIME' ? 'watch' : 'read';
  if (status === 'CURRENT') return `${mediaType}ing`;
  if (status === 'PLANNING') return `planning to ${mediaType}`;
  if (status === 'COMPLETED') return 'completed';
};

export const addedToFavorites = (title: string, favorite: boolean) => {
  return `${title} ${!favorite ? 'added to' : 'removed from'} favorites`;
};
