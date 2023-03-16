import React from 'react';
import { useQuery } from 'urql';

const query = `
query GetViewer {
  Viewer {
    id
    name
    siteUrl
    avatar {
      large
    }
  }
}
`;

export default function Home() {
  return (
    <span>
      Current User:
      <Viewer />
    </span>
  );
}

const Viewer = () => {
  const [result, reexecuteQuery] = useQuery({
    query: query,
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return <div>{data.Viewer.name}</div>;
};
