import { Product } from '../types/Product';

type SetProductsAction = { type: 'products/SET', payload: Product[] };

const setProducts = (products: Product[]): SetProductsAction => ({
  type: 'products/SET',
  payload: products,
});

export const productsActions = { setProducts };

type Action = SetProductsAction;

const productsReducer = (
  state: Product[] = [],
  action: Action,
): Product[] => {
  switch (action.type) {
    case 'products/SET':
      return action.payload;
    default:
      return state;
  }
};

export default productsReducer;