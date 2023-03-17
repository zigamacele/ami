import Image from 'next/image';
import { gql, useQuery } from 'urql';
import getViewer from '../graphql/query/getViewer.graphql';

export const GetViewer = () => {
  const [result] = useQuery({
    query: getViewer,
  });

  const { data, fetching, error } = result;

  if (fetching)
    return <span className="w-10 h-10 bg-neutral-700 animate-pulse"></span>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <Image
      src={data.Viewer.avatar.large}
      alt="Picture of the author"
      width={500}
      height={500}
      className="w-10 rounded-full"
    />
  );
};
