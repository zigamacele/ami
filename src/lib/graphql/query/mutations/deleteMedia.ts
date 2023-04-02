import { gql } from 'urql';

export const deleteMedia = gql`
  mutation Mutation($deleteMediaListEntryId: Int) {
    DeleteMediaListEntry(id: $deleteMediaListEntryId) {
      deleted
    }
  }
`;
