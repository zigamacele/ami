import { gql } from 'urql';

export const addToList = gql`
  mutation ($mediaId: Int, $status: MediaListStatus) {
    SaveMediaListEntry(mediaId: $mediaId, status: $status) {
      id
      status
      media {
        type
        title {
          romaji
        }
      }
    }
  }
`;
