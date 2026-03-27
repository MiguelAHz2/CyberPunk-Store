export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  tags: string[];
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  compareAtPriceRange: {
    minVariantPrice: Money;
  };
  images: Connection<ShopifyProductImage>;
  variants: Connection<ShopifyProductVariant>;
  options: ShopifyProductOption[];
  collections: Connection<{ handle: string; title: string }>;
  seo: SEO;
  featuredImage: ShopifyProductImage | null;
}

export interface ShopifyProductImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
  price: Money;
  compareAtPrice: Money | null;
  image: ShopifyProductImage | null;
}

export interface ShopifyProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyProductImage | null;
  products: Connection<ShopifyProduct>;
  seo: SEO;
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money | null;
  };
  lines: Connection<CartLine>;
  totalQuantity: number;
}

export interface CartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: { name: string; value: string }[];
    product: Pick<ShopifyProduct, "id" | "handle" | "title" | "featuredImage">;
  };
}

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface SEO {
  title: string | null;
  description: string | null;
}

export interface Connection<T> {
  edges: Edge<T>[];
  pageInfo?: PageInfo;
}

export interface Edge<T> {
  node: T;
  cursor?: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface ShopifyError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string[];
  extensions?: { code: string };
}

// Normalized types (unwrapped from Connection)
export type Product = ShopifyProduct;
export type Collection = ShopifyCollection;
export type Cart = ShopifyCart;
export type ProductVariant = ShopifyProductVariant;
export type ProductImage = ShopifyProductImage;
