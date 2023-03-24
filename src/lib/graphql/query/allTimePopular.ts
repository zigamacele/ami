import { gql } from 'urql';

export const allTimePopular = gql`
  query ($type: MediaType) {
    Page(page: 1, perPage: 5) {
      media(sort: [POPULARITY_DESC, ID], isAdult: false, type: $type) {
        id
        title {
          english
          native
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
`;
