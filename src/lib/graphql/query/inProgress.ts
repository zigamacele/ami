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
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      mediaList(userId: $userId, status: $status, type: $type) {
        status
        media {
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
