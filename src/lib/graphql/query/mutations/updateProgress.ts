import { gql } from 'urql';

export const updateProgress = gql`
  mutation Mutation($mediaId: Int, $progress: Int) {
    SaveMediaListEntry(mediaId: $mediaId, progress: $progress) {
      id
      status
      media {
        type
        title {
          userPreferred
        }
      }
    }
  }
`;
