import { gql } from 'urql';

export const allTimePopular = gql`
  query ($type: MediaType, $format: ScoreFormat, $perPage: Int, $page: Int) {
    Page(page: $page, perPage: $perPage) {
      media(sort: [POPULARITY_DESC, ID], isAdult: false, type: $type) {
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
          userPreferred
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
