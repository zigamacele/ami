import { gql } from 'urql';

export const editMedia = gql`
  mutation Mutation(
    $mediaId: Int
    $status: MediaListStatus
    $progress: Int
    $repeat: Int
    $startedAt: FuzzyDateInput
    $completedAt: FuzzyDateInput
    $scoreRaw: Int
  ) {
    SaveMediaListEntry(
      mediaId: $mediaId
      status: $status
      progress: $progress
      repeat: $repeat
      startedAt: $startedAt
      completedAt: $completedAt
      scoreRaw: $scoreRaw
    ) {
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
