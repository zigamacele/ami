import { gql } from 'urql';

export const Notification = gql`
  query {
    Page(page: 1, perPage: 50) {
      notifications {
        ... on AiringNotification {
          type
          animeId
          episode
          contexts
          createdAt
          media {
            title {
              romaji
            }
            id
            coverImage {
              large
            }
          }
        }
        ... on RelatedMediaAdditionNotification {
          context
          type
          createdAt
          media {
            title {
              romaji
            }
            id
            coverImage {
              large
            }
          }
        }
        ... on MediaDataChangeNotification {
          context
          type
          createdAt
          media {
            title {
              romaji
            }
            id
            coverImage {
              large
            }
          }
        }
        ... on FollowingNotification {
          type
          context
          createdAt
          user {
            avatar {
              large
            }
            name
            id
          }
        }
        ... on FollowingNotification {
          type
          context
          createdAt
          user {
            avatar {
              large
            }
            name
            id
          }
        }
        ... on ActivityMessageNotification {
          type
          context
          createdAt
          user {
            avatar {
              large
            }
            name
            id
          }
        }
        ... on ActivityLikeNotification {
          type
          context
          createdAt
          user {
            avatar {
              large
            }
            name
            id
          }
        }
      }
    }
  }
`;
