import { gql } from 'urql';

export const updateNotifications = gql`
  mutation Mutation {
    UpdateUser {
      unreadNotificationCount
    }
  }
`;
