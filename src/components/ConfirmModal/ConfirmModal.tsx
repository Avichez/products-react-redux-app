import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks';
import { client } from '../../api/apiClient';
import { productToDeleteActions } from '../../features/productToDelete';
import { Product } from '../../types/Product';
import { productsActions } from '../../features/products';

type Props = {
  productToDelete: Product
}

export const ConfirmModal: React.FC<Props> = ({ productToDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const dispatch = useAppDispatch();

  const handleDeleteProduct = async () => {
    try {
      if (productToDelete) {
        setIsDeleting(true);
        await client.delete(`/products/${productToDelete.id}`);
        const products = await client.get<Product[]>('/products');

        dispatch(productsActions.setProducts(products));
        dispatch(productToDeleteActions.removeProductToDelete());
      }
    } catch (error) {
      setHasError(true);
    } finally {
      setIsDeleting(false);
    }
  }

  const cancelDelete = () => {
    dispatch(productToDeleteActions.removeProductToDelete());
  }

  return (
    <div className='modal is-active'>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">DELETE</p>
          <button
            className="delete"
            aria-label="close"
            onClick={cancelDelete}
          ></button>
        </header>
        <section className="modal-card-body">
          {!isDeleting && !hasError && <p>Would you like to delete?</p>}
          {isDeleting && <p>Deleting...</p>}
          {!isDeleting && hasError && <p>Something went wrong, please reload the page!</p>}
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-danger"
            onClick={handleDeleteProduct}
          >
            Delete
          </button>
          <button
            className="button"
            onClick={cancelDelete}
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  )
}
