import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { ReactNode } from "react";

import type ProductsProvider from "./data/products";

export default interface MenuItem {
    name: string;
    link: string;
    params?: string;
    icon: IconDefinition;
    page?: ReactNode;
    provider?: ProductsProvider;
}