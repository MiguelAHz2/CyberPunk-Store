import { BASE_FRAGMENTS } from "./fragments";

export const GET_PRODUCTS_QUERY = `
  query GetProducts(
    $first: Int!
    $after: String
    $query: String
    $sortKey: ProductSortKeys
    $reverse: Boolean
  ) {
    products(
      first: $first
      after: $after
      query: $query
      sortKey: $sortKey
      reverse: $reverse
    ) {
      edges {
        cursor
        node { ...ProductFields }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
  ${BASE_FRAGMENTS}
`;

export const GET_PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFields
    }
  }
  ${BASE_FRAGMENTS}
`;

export const GET_FEATURED_PRODUCTS_QUERY = `
  query GetFeaturedProducts($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      edges {
        node { ...ProductFields }
      }
    }
  }
  ${BASE_FRAGMENTS}
`;

export const SEARCH_PRODUCTS_QUERY = `
  query SearchProducts($query: String!, $first: Int!) {
    products(query: $query, first: $first) {
      edges {
        node {
          id
          handle
          title
          featuredImage { url altText width height }
          priceRange {
            minVariantPrice { amount currencyCode }
          }
          availableForSale
        }
      }
    }
  }
`;
