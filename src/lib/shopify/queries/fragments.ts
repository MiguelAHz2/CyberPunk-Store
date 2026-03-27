// Cada fragmento se define UNA SOLA VEZ.
// Los fragmentos NO se embeben entre sí — los queries los incluyen todos al final.

export const MONEY_FRAGMENT = `
  fragment MoneyFields on MoneyV2 {
    amount
    currencyCode
  }
`;

export const IMAGE_FRAGMENT = `
  fragment ImageFields on Image {
    url
    altText
    width
    height
  }
`;

export const SEO_FRAGMENT = `
  fragment SEOFields on SEO {
    title
    description
  }
`;

// Depende de MoneyFields e ImageFields — NO los incluye inline
export const PRODUCT_VARIANT_FRAGMENT = `
  fragment ProductVariantFields on ProductVariant {
    id
    title
    availableForSale
    selectedOptions {
      name
      value
    }
    price {
      ...MoneyFields
    }
    compareAtPrice {
      ...MoneyFields
    }
    image {
      ...ImageFields
    }
  }
`;

// Depende de todos los anteriores — NO los incluye inline
export const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    availableForSale
    tags
    priceRange {
      minVariantPrice { ...MoneyFields }
      maxVariantPrice { ...MoneyFields }
    }
    compareAtPriceRange {
      minVariantPrice { ...MoneyFields }
    }
    featuredImage {
      ...ImageFields
    }
    images(first: 10) {
      edges {
        node { ...ImageFields }
      }
    }
    variants(first: 50) {
      edges {
        node { ...ProductVariantFields }
      }
    }
    options {
      id
      name
      values
    }
    seo { ...SEOFields }
  }
`;

export const CART_LINE_FRAGMENT = `
  fragment CartLineFields on CartLine {
    id
    quantity
    cost {
      totalAmount { ...MoneyFields }
    }
    merchandise {
      ... on ProductVariant {
        id
        title
        selectedOptions { name value }
        product {
          id
          handle
          title
          featuredImage { ...ImageFields }
        }
      }
    }
  }
`;

export const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { ...MoneyFields }
      totalAmount    { ...MoneyFields }
      totalTaxAmount { ...MoneyFields }
    }
    lines(first: 100) {
      edges {
        node { ...CartLineFields }
      }
    }
  }
`;

// ── Helpers para componer queries sin duplicar fragmentos ──────

/** Fragmentos base usados por casi todos los queries de producto */
export const BASE_FRAGMENTS = `
  ${MONEY_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${SEO_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  ${PRODUCT_FRAGMENT}
`;

/** Fragmentos para queries de carrito */
export const CART_FRAGMENTS = `
  ${MONEY_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${CART_LINE_FRAGMENT}
  ${CART_FRAGMENT}
`;
