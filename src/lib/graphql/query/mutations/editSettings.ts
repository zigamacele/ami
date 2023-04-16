import { gql } from 'urql';

export const editSettings = gql`
  mutation Mutation(
    $scoreFormat: ScoreFormat
    $titleLanguage: UserTitleLanguage
  ) {
    UpdateUser(scoreFormat: $scoreFormat, titleLanguage: $titleLanguage) {
      mediaListOptions {
        scoreFormat
      }
      options {
        titleLanguage
      }
    }
  }
`;
