import { gql } from 'urql';

export const inProgress = gql`
  query (
    $userId: Int
    $page: Int
    $perPage: Int
    $status: MediaListStatus
    $type: MediaType
    $format: ScoreFormat
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
        perPage
      }
      mediaList(
        sort: [UPDATED_TIME_DESC, MEDIA_ID]
        userId: $userId
        status: $status
        type: $type
      ) {
        progress
        score
        progressVolumes
        status
        media {
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
          trailer {
            id
            site
            thumbnail
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
  }
`;
