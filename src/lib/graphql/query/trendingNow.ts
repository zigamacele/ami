import { gql } from 'urql';

export const trendingNow = gql`
  query ($type: MediaType, $format: ScoreFormat) {
    Page(page: 1, perPage: 5) {
      media(sort: [TRENDING_DESC, ID], isAdult: false, type: $type) {
        id
        description
        status
        isFavourite
        endDate {
          day
          month
          year
        }
        startDate {
          day
          month
          year
        }
        format
        season
        seasonYear
        favourites
        episodes
        status
        chapters
        volumes
        genres
        duration
        averageScore
        popularity
        type
        title {
          romaji
        }
        bannerImage
        coverImage {
          large
        }
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
      }
    }
  }
`;
