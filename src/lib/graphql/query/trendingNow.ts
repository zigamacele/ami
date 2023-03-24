import { gql } from 'urql';

export const trendingNow = gql`
  query ($type: MediaType) {
    Page(page: 1, perPage: 5) {
      media(sort: [TRENDING_DESC, ID], isAdult: false, type: $type) {
        id
        status
        title {
          english
          native
          romaji
        }
        bannerImage
        coverImage {
          large
        }
      }
    }
  }
`;
