import { Product } from "../data/products";

type MetaEventParameters = Record<string, string | number | string[]>;

declare global {
  interface Window {
    fbq?: (command: "track" | "trackCustom", eventName: string, parameters?: MetaEventParameters) => void;
    dataLayer?: Array<Record<string, unknown>>;
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
  const googleEventName = eventName
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .toLowerCase();

  window.dataLayer?.push({
    event: `seller_${googleEventName}`,
    tracking_event: eventName,
    ...parameters,
  });
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

export const trackMenuToggle = (isOpen: boolean) =>
  track("trackCustom", isOpen ? "MenuOpened" : "MenuClosed", {
    menu_location: "header",
  });

export const trackMenuNavigation = (itemName: string, destinationPath: string) =>
  track("trackCustom", "MenuNavigation", {
    menu_location: "header",
    menu_item: itemName,
    destination_path: destinationPath,
  });
