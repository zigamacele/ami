import { gql } from 'urql';

export const singleMediaInfo = gql`
  query ($mediaId: Int, $format: ScoreFormat) {
    Media(id: $mediaId) {
      id
      description
      status
      isFavourite
      endDate {
        day
        month
        year
      }
      startDate {
        day
        month
        year
      }
      format
      season
      seasonYear
      favourites
      episodes
      status
      chapters
      volumes
      genres
      duration
      averageScore
      popularity
      type
      trailer {
        id
        site
        thumbnail
      }
      mediaListEntry {
        score(format: $format)
        id
        progress
        progressVolumes
        repeat
        notes
        status
        startedAt {
          year
          month
          day
        }
        completedAt {
          year
          month
          day
        }
      }
      title {
        userPreferred
      }
      bannerImage
      coverImage {
        color
        large
      }
      relations {
        nodes {
          id
          coverImage {
            large
          }
          title {
            userPreferred
          }
          type
          status
        }
        edges {
          relationType
        }
      }
      staff(sort: [RELEVANCE, ID]) {
        edges {
          node {
            image {
              large
            }
            name {
              full
            }
          }
          role
        }
      }
      recommendations {
        edges {
          node {
            media {
              id
              coverImage {
                large
              }
              title {
                userPreferred
              }
            }
          }
        }
      }
      characters(sort: [RELEVANCE, ID]) {
        edges {
          role
          node {
            image {
              large
            }
          }
          voiceActors {
            name {
              full
            }
            image {
              large
            }
            languageV2
          }
        }
        nodes {
          name {
            full
          }
        }
      }
    }
  }
`;
