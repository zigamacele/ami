import { gql } from 'urql';

export const addToFavorites = gql`
  mutation ($animeId: Int, $mangaId: Int) {
    ToggleFavourite(animeId: $animeId, mangaId: $mangaId) {
      anime {
        nodes {
          id
        }
      }
    }
  }
`;
