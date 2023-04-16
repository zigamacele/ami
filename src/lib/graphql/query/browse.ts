import { gql } from 'urql';

export const browse = gql`
  query ($type: MediaType, $search: String, $format: ScoreFormat) {
    Page(page: 1, perPage: 48) {
      media(
        sort: [SCORE_DESC, ID]
        isAdult: false
        type: $type
        search: $search
      ) {
        id
        status
        type
        mediaListEntry {
          score(format: $format)
          id
          progress
          progressVolumes
          repeat
          notes
          status
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
          userPreferred
        }
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        bannerImage
        coverImage {
          color
          large
        }
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
          mediaId
        }
        studios {
          nodes {
            name
          }
        }
      }
    }
  }
`;
