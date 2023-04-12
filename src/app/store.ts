/* eslint-disable @typescript-eslint/no-unused-vars */
import { createStore, combineReducers } from 'redux';
import commentsReducer from '../features/comments';
import productsReducer from '../features/products';
import productToDeleteReducer from '../features/productToDelete';
import productToEditReducer from '../features/productToEdit';

const rootReducer = combineReducers({
  products: productsReducer,
  comments: commentsReducer,
  productToDelete: productToDeleteReducer,
  productToEdit: productToEditReducer,
});

export const store = createStore(
  rootReducer,
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
