import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { productToDeleteActions } from '../../features/productToDelete';
import { productToEditActions } from '../../features/productToEdit';
import { Product } from '../../types/Product';
import './ProductCard.scss';

type Props = {
  product: Product
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  const {
    imageUrl,
    name,
    count,
    size,
    weight,
  } = product;

  const onDeleteProduct = () => {
    dispatch(productToDeleteActions.setProductToDelete(product));
  }

  const onEditProduct = () => {
    dispatch(productToEditActions.setProductToEdit(product));
  }

  return (
    <div className="column card Product_Card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={imageUrl ? `${imageUrl}` : "https://bulma.io/images/placeholders/1280x960.png"} alt="Placeholder" />
        </figure>
      </div>
      <div className="card-content">
        <div className="content">
          <h4>{name}</h4>
          <p>{`Count: ${count}`}</p>
          <p>{`Size: ${size.width} & ${size.height}`}</p>
          <p>{`Weight: ${weight}`}</p>
        </div>
      </div>
      <footer className="card-footer">
        <button
          className="button card-footer-item"
          onClick={onDeleteProduct}
        >
          Delete
        </button>
        <button
          className="button card-footer-item"
          onClick={onEditProduct}
        >
          Edit
        </button>
      </footer>
    </div>
  )
}
