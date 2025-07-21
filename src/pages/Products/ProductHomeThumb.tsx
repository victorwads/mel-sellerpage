import { Link } from "react-router-dom";
import "./ProductHomeThumb.css";

import { Product } from '../../main/data/products';
import { capitalizeSelective } from "./ProductThumb";
import { getPageByType } from "../../main/Menus";

export interface ProductProps {
  item: Product;
  onSelected: (product: Product) => void;
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
