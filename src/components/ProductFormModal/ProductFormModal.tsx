import React, { useState } from 'react'
import { client } from '../../api/apiClient';
import { useAppDispatch } from '../../app/hooks';
import { productsActions } from '../../features/products';
import { productToEditActions } from '../../features/productToEdit';
import { Product, Size } from '../../types/Product';

type Props = {
  productToEdit: Product | null,
  setIsNewProduct: (isClose: boolean) => void,
}

export const ProductFormModal: React.FC<Props> = ({ productToEdit, setIsNewProduct }) => {
  const dispatch = useAppDispatch();
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState(productToEdit?.name || '');
  const [imageUrl, setImageUrl] = useState(productToEdit?.imageUrl || '');
  const [count, setCount] = useState(productToEdit?.count || 0);
  const [size, setSizes] = useState<Size>(productToEdit?.size || { width: 0, height: 0 });
  const [weight, setWeight] = useState(productToEdit?.weight || '');

  const cancelEdit = () => {
    dispatch(productToEditActions.removeProductToEdit());
    setIsNewProduct(false);
  }

  const createNewProduct = async () => {
    if (!name || !count || !size.height || !size.width || !weight) {
      setHasError(true);
      setErrorMessage('Please fill up all fields');

      return;
    }

    const newProduct = {
      name,
      imageUrl,
      count,
      size,
      weight
    }

    try {
      if (productToEdit) {
        await client.patch<Product>(`/products/${productToEdit.id}`, newProduct);
      } else {
        await client.post<Product>('/products', newProduct);
      }

      const products = await client.get<Product[]>('/products');
      dispatch(productsActions.setProducts(products));
      cancelEdit();
    } catch (error: any) {
      console.log(error.message);
      setHasError(true);
      setErrorMessage('Something went wrong!')
    }
  }

  return (
    <div className='modal is-active'>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Edit Product</p>
          <button
            className="delete"
            aria-label="close"
            onClick={cancelEdit}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="e.g Some Product Name"
                value={name}
                onChange={event => {
                  setHasError(false)
                  setName(event.target.value)
                }}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Image URL</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="image URL"
                value={imageUrl}
                onChange={event => {
                  setHasError(false)
                  setImageUrl(event.target.value)
                }}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Count</label>
            <div className="control">
              <input
                className="input"
                type="number"
                value={count}
                onChange={event => {
                  setHasError(false)
                  setCount(+event.target.value)
                }}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Width</label>
            <div className="control">
              <input
                className="input"
                type="number"
                value={size.width}
                onChange={event => {
                  setHasError(false)
                  setSizes(prevSize => ({
                    ...prevSize,
                    width: +event.target.value,
                  }))
                }
                }
              />
            </div>
            <label className="label">Height</label>
            <div className="control">
              <input
                className="input"
                type="number"
                value={size.height}
                onChange={event => {
                  setHasError(false)
                  setSizes(prevSize => ({
                    ...prevSize,
                    height: +event.target.value,
                  }))
                }}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Weight</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="e.g 500g"
                value={weight}
                onChange={event => {
                  setHasError(false)
                  setWeight(event.target.value)
                }}
              />
            </div>
          </div>
          {hasError && (
            <div className="notification is-danger">
              <button
                className="delete"
                onClick={() => setHasError(false)}
              ></button>
              {errorMessage}
            </div>
          )}
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-warning"
            onClick={createNewProduct}
          >
            Save
          </button>
          <button
            className="button"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  )
}
