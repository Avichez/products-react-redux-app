import { Product } from '../types/Product';

type SetProductAction = { type: 'productToEdit/SET', payload: Product };
type RemoveProductAction = { type: 'productToEdit/REMOVE' };

const setProductToEdit = (product: Product): SetProductAction => ({
  type: 'productToEdit/SET',
  payload: product,
});
const removeProductToEdit = (): RemoveProductAction => ({
  type: 'productToEdit/REMOVE',
});

export const productToEditActions = { setProductToEdit, removeProductToEdit };

type Action = SetProductAction | RemoveProductAction;
type ProductToEditState = Product | null;

const productToEditReducer = (
  state: ProductToEditState = null,
  action: Action,
): ProductToEditState => {
  switch (action.type) {
    case 'productToEdit/SET':
      return action.payload;
    case 'productToEdit/REMOVE':
      return null;
    default:
      return state;
  }
};

export default productToEditReducer;