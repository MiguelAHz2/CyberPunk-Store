import { BASE_FRAGMENTS } from "./fragments";

export const GET_COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          image {
            url
            altText
            width
            height
          }
          seo { title description }
        }
      }
    }
  }
`;

export const GET_COLLECTION_PRODUCTS_QUERY = `
  query GetCollectionProducts(
    $handle: String!
    $first: Int!
    $after: String
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image { url altText width height }
      seo { title description }
      products(
        first: $first
        after: $after
        sortKey: $sortKey
        reverse: $reverse
      ) {
        edges {
          cursor
          node { ...ProductFields }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
  ${BASE_FRAGMENTS}
`;
