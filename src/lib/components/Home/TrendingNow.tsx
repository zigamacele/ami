import React from 'react';
import { gql, useQuery } from 'urql';

const getAnimeList = gql`
  query ($page: Int, $perPage: Int, $sort: [MediaListSort]) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      mediaList(sort: $sort) {
        media {
          title {
            english
            native
            romaji
          }
          description
          episodes
          genres
          season
          seasonYear
        }
      }
    }
  }
`;

export default function TrendingNow() {
  const variables = {
    sort: 'MEDIA_POPULARITY',
    page: 1,
    perPage: 10,
  };

  const [result] = useQuery({
    query: getAnimeList,
    variables: variables,
  });
  const { data, fetching, error } = result;
  console.log(data);

  return <div>TrandingNow</div>;
}
