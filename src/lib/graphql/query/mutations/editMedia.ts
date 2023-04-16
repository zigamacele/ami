import { gql } from 'urql';

export const editMedia = gql`
  mutation Mutation(
    $mediaId: Int
    $status: MediaListStatus
    $progress: Int
    $repeat: Int
    $startedAt: FuzzyDateInput
    $completedAt: FuzzyDateInput
    $score: Float
  ) {
    SaveMediaListEntry(
      mediaId: $mediaId
      status: $status
      progress: $progress
      repeat: $repeat
      startedAt: $startedAt
      completedAt: $completedAt
      score: $score
    ) {
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
