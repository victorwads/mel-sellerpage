import { Link } from "react-router-dom";
import "./ProductHomeThumb.css";

import { Product, ProductType } from '../../main/data/products';
import { capitalizeSelective } from "./ProductThumb";
import { menuItems } from "../../main/Header";

export interface ProductProps {
  item: Product;
  onSelected: (product: Product) => void;
}

const pageByType: {[K in ProductType]?: string;} = {}
menuItems.forEach(item => {
  const type = item?.provider?.getType();
  if (!type) return;

  pageByType[type] = item.link;
});

function getPageByType(type?: ProductType): string {
  if (!type) return 'unknown';
  return pageByType[type] || 'unknown';
}

export default function ProductHomeThumb({ item }: ProductProps) {  
  return <Link to={getPageByType(item.type) + '/' + item.id}  className="product-home-item">
    <div>
      <span>{item.category || item.type}</span>
      <h2>{capitalizeSelective(item.name)}</h2>
      <div className="line" />
      <p>{item.headline}</p>
    </div>
    <div>
      <div className="product-image" style={{ backgroundImage: `url(${item.image})`}} />
    </div>
  </Link>
}
