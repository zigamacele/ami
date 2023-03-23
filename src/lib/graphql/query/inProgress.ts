import { gql } from 'urql';

export const inProgress = gql`
  query (
    $userId: Int
    $page: Int
    $perPage: Int
    $status: MediaListStatus
    $type: MediaType
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
          format
          episodes
          chapters
          title {
            romaji
          }
          bannerImage
          coverImage {
            medium
            large
          }
        }
      }
    }
  }
`;
