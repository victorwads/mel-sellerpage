import { Product } from "../data/products";

type MetaEventParameters = Record<string, string | number | string[]>;

declare global {
  interface Window {
    fbq?: (command: "track" | "trackCustom", eventName: string, parameters?: MetaEventParameters) => void;
  }
}

const currency = "BRL";

const productParameters = (product: Product, source: string): MetaEventParameters => {
  const parameters: MetaEventParameters = {
    content_ids: product.id ? [product.id] : [],
    content_name: product.name || "Produto",
    content_type: "product",
    content_category: product.category || product.type || "other",
    source,
  };

  if (typeof product.price === "number" && Number.isFinite(product.price)) {
    parameters.value = product.price;
    parameters.currency = currency;
  }

  return parameters;
};

const track = (command: "track" | "trackCustom", eventName: string, parameters: MetaEventParameters) => {
  window.fbq?.(command, eventName, parameters);
};

export const trackProductListClick = (product: Product, source: string) =>
  track("trackCustom", "ProductListClick", productParameters(product, source));

export const trackProductView = (product: Product) =>
  track("track", "ViewContent", productParameters(product, "product_detail"));

export const trackPurchaseIntent = (product: Product, source: string) =>
  track("track", "InitiateCheckout", productParameters(product, source));

export const trackProductDetailsScrolled = (product: Product) =>
  track("trackCustom", "ProductDetailsScrolled", {
    ...productParameters(product, "product_detail"),
    scroll_depth: 50,
  });

export const trackContact = (channel: string) =>
  track("track", "Contact", { contact_channel: channel });

export const trackSocialClick = (network: string, destinationUrl: string) =>
  track("trackCustom", "SocialClick", {
    social_network: network,
    destination_url: destinationUrl,
  });
