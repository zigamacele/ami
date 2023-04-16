import { gql } from 'urql';

export const seasonalMedia = gql`
  query (
    $format: MediaFormat
    $scoreFormat: ScoreFormat
    $perPage: Int
    $page: Int
    $season: MediaSeason
    $seasonYear: Int
  ) {
    Page(page: $page, perPage: $perPage) {
      media(
        sort: [POPULARITY_DESC, ID]
        format: $format
        isAdult: false
        season: $season
        seasonYear: $seasonYear
      ) {
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
        rankings {
          allTime
          rank
          season
          context
        }
        popularity
        type
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
          mediaId
        }
        trailer {
          id
          site
          thumbnail
        }
        title {
          userPreferred
          native
        }
        bannerImage
        coverImage {
          large
          color
        }
        mediaListEntry {
          score(format: $scoreFormat)
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
