import React, { useEffect, useState } from 'react'
import { client } from '../../api/apiClient';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ConfirmModal } from '../../components/ConfirmModal';
import { ProductFormModal } from '../../components/ProductFormModal';
import { ProductsList } from '../../components/ProductsList'
import { SortProducts } from '../../components/SortProducts'
import { productsActions } from '../../features/products';
import { Product } from '../../types/Product';

export const ProductsPage: React.FC = () => {
  const { productToEdit, productToDelete } = useAppSelector(state => state);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const productsData = await client.get<Product[]>('/products');

        dispatch(productsActions.setProducts(productsData));
      } catch (error: any) {
        console.log(error.message);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getAllProducts();
    // eslint-disable-next-line
  }, []);


  return (
    <>
      <div className='is-flex'>
        <SortProducts />
        <button
          className='button ml-3'
          onClick={() => setIsNewProduct(true)}
        >
          Add Product
        </button>
      </div>
      {isLoading && <h2>Loading...</h2>}
      {hasError && <h2>Something went wrong!</h2>}
      {!isLoading && !hasError && <ProductsList products={products} />}
      {productToDelete && <ConfirmModal productToDelete={productToDelete} />}
      {(productToEdit || isNewProduct)
        && <ProductFormModal productToEdit={productToEdit} setIsNewProduct={setIsNewProduct} />}
    </>
  )
}
