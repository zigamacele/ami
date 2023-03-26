import { gql } from 'urql';

export const singleMediaInfo = gql`
  query ($mediaId: Int) {
    Media(id: $mediaId) {
      id
      description
      status
      mediaListEntry {
        status
      }
      format
      season
      seasonYear
      episodes
      chapters
      volumes
      genres
      duration
      averageScore
      popularity
      type
      mediaListEntry {
        status
      }
      title {
        romaji
      }
      bannerImage
      coverImage {
        color
        large
      }
    }
  }
`;
