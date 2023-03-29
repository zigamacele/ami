import { gql } from 'urql';

export const singleMediaInfo = gql`
  query ($mediaId: Int) {
    Media(id: $mediaId) {
      id
      description
      status
      mediaListEntry {
        status
      }
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
        score
        progress
        progressVolumes
        repeat
        notes
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
        romaji
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
            romaji
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
                romaji
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
