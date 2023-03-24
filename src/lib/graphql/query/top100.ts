import { gql } from 'urql';

export const top100 = gql`
  query ($type: MediaType) {
    Page(page: 1, perPage: 10) {
      media(sort: [SCORE_DESC, ID], isAdult: false, type: $type) {
        id
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
  }
`;
