import { gql } from 'urql';

export const top100 = gql`
  query ($type: MediaType, $perPage: Int, $page: Int) {
    Page(page: $page, perPage: $perPage) {
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
          userPreferred
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
