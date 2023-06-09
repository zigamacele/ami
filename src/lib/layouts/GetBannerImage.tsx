import { gql, useQuery } from 'urql';

const getViewer = gql`
  query {
    Viewer {
      id
      name
      bannerImage
      avatar {
        large
      }
    }
  }
`;

export const GetBannerImage = ({
  hoverBackground,
}: {
  hoverBackground: string;
}) => {
  const [result] = useQuery({
    query: getViewer,
  });

  const { data, fetching, error } = result;
  if (fetching)
    return <span className="w-screen h-32 bg-neutral-700 animate-pulse"></span>;

  return (
    <header className="flex w-screen bg-neutral-900 h-32 justify-end items-end relative fade-in-slow">
      <div className="absolute opacity-30 w-full h-32 bg-gradient-to-t from-neutral-900 via-neutral-900 top-0"></div>
      {hoverBackground === '' || !hoverBackground ? (
        <div>
          {data.Viewer.bannerImage ? (
            <img
              src={data.Viewer.bannerImage}
              alt="Picture of the author"
              className="w-screen object-cover"
            />
          ) : null}
        </div>
      ) : (
        <img
          src={hoverBackground ? hoverBackground : data.Viewer.bannerImage}
          alt="Picture of the author"
          className="w-screen object-cover"
        />
      )}
    </header>
  );
};
