import { gql, useQuery } from 'urql';

const getAnimeList = gql`
  query ($userId: Int, $page: Int, $perPage: Int, $status: MediaListStatus) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      mediaList(userId: $userId, status: $status) {
        media {
          title {
            romaji
          }
        }
      }
    }
  }
`;

const getViewer = gql`
  query {
    Viewer {
      id
      name
      siteUrl
      bannerImage
      avatar {
        large
      }
    }
  }
`;

export const GetAnimeList = () => {
  // const [viewer] = useQuery({ query: getViewer });
  // console.log('viewer', viewer.data.Viewer.id);

  const variables = { userId: 370243, status: 'CURRENT', page: 1, perPage: 10 };

  const [result] = useQuery({
    query: getAnimeList,
    variables: variables,
  });
  const { data, fetching, error } = result;
  if (fetching)
    return (
      <span className="w-10 h-10 bg-neutral-700 rounded-full animate-pulse"></span>
    );
  if (error) return <p>Oh no... {error.message}</p>;

  console.log(data);

  return <div></div>;
};
