import { Link } from "react-router-dom";
import "./ProductHomeThumb.css";

import { Product, ProductType } from '../../main/data/products';
import { capitalizeSelective } from "./ProductThumb";
import { trackProductListClick } from "../../main/tracking/metaPixel";

export interface ProductProps {
  item: Product;
  onSelected: (product: Product) => void;
}

const pageByType: Record<ProductType, string> = {
  "course": "cursos",
  "book": "livros",
  "appointment": "atendimentos",
}

export default function ProductHomeThumb({ item }: ProductProps) {
  

  return <Link to={pageByType[item.type!] + '/' + item.id} className="product-home-item" onClick={() => trackProductListClick(item, "home") }>
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
