import React from 'react';
import './ProductsList.scss';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';

type Props = {
  products: Product[],
}

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className="Products-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}