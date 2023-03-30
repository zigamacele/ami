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
          score
          progress
          progressVolumes
          repeat
          notes
          startedAt {
            year
            month
            day
          }
          completedAt {
            year
            month
            day
          }
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
