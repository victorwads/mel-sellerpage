import { Link } from "react-router-dom";
import "./ProductThumb.css";

import Icon, { Icons } from "../../components/Icons";
import { Product } from "../../main/data/products";
import { trackProductListClick, trackPurchaseIntent } from "../../main/tracking/metaPixel";

export interface ProductProps {
  item: Product;
  onSelected: (product: Product) => void;
}

export default function ProductThumb({ item }: ProductProps) {
  return <div className="product-item">
    <div className="product-image" style={{ backgroundImage: `url(${item.image})`}} />
    <span>{item.category || item.type}</span>
    <h2>{capitalizeSelective(item.name)}</h2>
    <div className="product-actions">
      <a className="button-by" href={item.purchaseUrl} onClick={() => trackPurchaseIntent(item, "product_list")}><Icon icon={Icons.solid.faCartShopping} />Adquirir</a>
      <Link className="button-by see" to={item.id!} onClick={() => trackProductListClick(item, "product_list")}><Icon icon={Icons.solid.faEye} />Ver Mais</Link>
    </div>
  </div>
}

export function capitalizeSelective(string?: string) {
  return (string ?? "").toLocaleLowerCase().split(" ")
    .map((word, index) => (word.length > 2 || index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(" ");
}
