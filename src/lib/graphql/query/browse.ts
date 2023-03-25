import { gql } from 'urql';

export const browse = gql`
  query ($type: MediaType, $search: String) {
    Page(page: 1, perPage: 48) {
      media(
        sort: [SCORE_DESC, ID]
        isAdult: false
        type: $type
        search: $search
      ) {
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
