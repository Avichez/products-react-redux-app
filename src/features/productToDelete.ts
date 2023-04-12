import { Product } from '../types/Product';

type SetProductAction = { type: 'productToDelete/SET', payload: Product };
type RemoveProductAction = { type: 'productToDelete/REMOVE' };

const setProductToDelete = (product: Product): SetProductAction => ({
  type: 'productToDelete/SET',
  payload: product,
});
const removeProductToDelete = (): RemoveProductAction => ({
  type: 'productToDelete/REMOVE',
});

export const productToDeleteActions = { setProductToDelete, removeProductToDelete };

type Action = SetProductAction | RemoveProductAction;
type ProductToDeleteState = Product | null;

const productToDeleteReducer = (
  state: ProductToDeleteState = null,
  action: Action,
): ProductToDeleteState => {
  switch (action.type) {
    case 'productToDelete/SET':
      return action.payload;
    case 'productToDelete/REMOVE':
      return null;
    default:
      return state;
  }
};

export default productToDeleteReducer;